import React, {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import "./mutualFundCap.css"

// This will take props like 
// URL
const MutualFundCap = ({url, FundCategory}) => {
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const navigate = useNavigate();
    // const [scripcode, setScripcode] = useState();
    // const [fundName, setFundName] = useState();
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
            console.log(response.data)
          if (Array.isArray(response.data)) {
            setResult(response.data);
          } else if (response.data && Array.isArray(response.data)) { 
            setResult(response.data);
          } else {
            console.error("Unexpected API response format");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setResult([]);
        }
      };
      fetchData();
    }, []);
  
    const handleClick = (result) => {
      console.log(result.scripcode);
      navigate(`/mutual-fund/${result.scripcode}`, {
        state: {
            // TODO: have to declare variables to store values of the sciprcode and other details to be send as parameter to next page. 
          stockID: result.scripecode,
          long_name: result.name,
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
        <div className="mutual-fund-hero">
          <div className="mutual-fund-category-selector">
            <div className="mutual-fund-category-selector-list">
            <h1>{FundCategory} Cap</h1>
              </div>
            </div>
          </div>
  
          <div className="mutual-fund-table">
            <div className="mutual-fund-table-header">
              <div className="mutual-fund-table-header-company">Fund Name</div>
              <div className="mutual-fund-table-header-price">NAV</div>
            </div>
  
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <div
                  key={index}
                  className="mutual-fund-table-row"
                  onClick={() => handleClick(item)}
                >
                  <div className="mutual-fund-table-row-company">{item.name}</div>
                  <div className="mutual-fund-table-row-price">
                    <div>
                      <h1>{`${item.additionalData.LTP}`}</h1>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
  
            <div className="mutual-fund-pagination">
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
      </>
    );
  };

export default MutualFundCap;
