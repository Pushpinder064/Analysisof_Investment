import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./market.css";

const Market = () => {
  const [topGainer, setTopGainer] = useState(true);
  const [topLoser, setTopLoser] = useState(false);
  const [currCategory, setCurrCategory] = useState("Top Gainer");
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = topGainer
          ? "http://localhost:3000/api/v1/market/top_gainers"
          : "http://localhost:3000/api/v1/market/top_losers";
        const response = await axios.get(endpoint);

        if (Array.isArray(response.data)) {
          setResult(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setResult(response.data.data);
        } else {
          console.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setResult([]);
      }
    };

    fetchData();
  }, [currCategory]);

  const handleClickGainer = () => {
    setTopGainer(true);
    setCurrCategory("Top Gainer");
    setTopLoser(false);
    console.log(currCategory);
    setResult([]);
    setCurrentPage(1); // Reset to the first page
  };

  const handleClickLoser = () => {
    setTopGainer(false);
    setCurrCategory("Top Loser");
    console.log(currCategory);
    setTopLoser(true);
    setResult([]);
    setCurrentPage(1); // Reset to the first page
  };

  const handleClick = (result) => {
    navigate(`/stock/${result.scrip_cd}`, {
      state: {
        scripname: result.scripname,
        long_name: result.LONG_NAME,
        stockID: result.scrip_cd,
      },
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(result.length / itemsPerPage);

  return (
    <>
      <Header />
      <div className="market-page-hero">
        <h1 className="hero-tag">{currCategory}</h1>

        <div className="category-selector">
          <div className="category-selector-list">
            <div
              onClick={handleClickGainer}
              className={topGainer ? "active" : ""}
            >
              <h1>Top Gainer</h1>
            </div>
            <div
              className={topLoser ? "active" : ""}
              onClick={handleClickLoser}
            >
              <h1>Top Loser</h1>
            </div>
          </div>
        </div>

        <div className="market-table">
          <div className="table-header">
            <div className="table-header-company">COMPANY</div>
            <div className="table-header-price">MARKET PRICE</div>
            <div className="table-header-open-rate">Open Rate</div>
            <div className="table-header-close-rate">Close Rate</div>
          </div>

          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                key={index}
                className="table-row"
                onClick={() => handleClick(item)}
              >
                <div className="table-row-company">{item.LONG_NAME}</div>
                <div className="table-row-price">
                  <div>
                    <h1>{`₹${item.ltradert}`}</h1>
                    <h2>{`₹${item.change_percent}`}</h2>
                  </div>
                </div>
                <div className="table-row-open-rate">{item.openrate}</div>
                <div className="table-row-close-rate">{item.ltradert}</div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
