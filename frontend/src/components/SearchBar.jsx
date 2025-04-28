import React, { useState, useEffect } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [assetClass, setAssetClass] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    console.log("Asset Class Updated:", assetClass);
    // You can also use assetClass here if needed.
  }, [assetClass]);

  // Handle click outside the search bar to close options
  const handleClickOutside = (event) => {
    const searchBarContainer = document.querySelector(".search-bar-container");
    if (searchBarContainer && !searchBarContainer.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    // Add event listener on document mount
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (result) => {
    // navigate('/search');
    console.log("here is the result-> ", result);
    let heroArray = result.symbol;

    // Use a regular expression to split by any whitespace (including multiple spaces)
    let resultArray = heroArray.split(/\s+/);
    console.log("Here is the array after I have split it", resultArray);

    // Extract the relevant part from the array (adjust this index based on your needs)
    let part = resultArray[0]; // This is still the first part
    console.log("here is the part value: ", part);

    // You can now extract other parts like stock code if needed
    let stockCode = resultArray[2]; // Adjust the index based on which part you need
    console.log("Extracted Stock Code:", stockCode);

    // console.log(`/stock/${resultArray[2]}`)
    navigate(`/stock/${stockCode}`)
  };

  const handleAssetClass = (event) => {
    setAssetClass(event);
    console.log(assetClass);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length > 2) {
      const response = await fetch(
        `http://localhost:3000/api/v1/search?assetType=${assetClass}&searchValue=${value}`
      );
      const data = await response.json();
      console.log(data);
      setResults(data);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="What are you looking for today?"
      />
      {showResults && (
        <div className="search-results">
          <div className="search-asset-class">
            {["All", "Stocks", "MF", "IPO"].map((item) => (
              <button
                key={item}
                onClick={() => handleAssetClass(item)}
                className={assetClass === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
          {results.map((result, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleClick(result)}
            >
              {/* TODO : HERE SEE WHAT ARE THE THINGS COMING IN THE DATA BECAUSE WE HAVE TO PASS LONG NAME, ID AND OTHER INFORMATION TO STOCK - INFO PAGE */}
              <div className="search-result-name">{result.name}</div>
              <div className="search-result-type">{result.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
