import React, { useState } from "react";
import Header from "./Header";
import "./InvestmentCalculator.css";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const InvestmentCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [timeSpan, setTimeSpan] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [allocation, setAllocation] = useState([33.3, 33.3, 33.3]);
  const [showAssetClasses, setShowAssetClasses] = useState(false); // New state
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/mutual-fund-investment-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalInvestment,
          expectedReturn,
          timeSpan,
          riskTolerance,
        }),
      });
      const data = await response.json();
      console.log(data);
      setAllocation(data.investments);
      setShowAssetClasses(true); // Show asset classes section on submit
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLargeCap = () => {
    // Navigate to the large cap mutual funds page
    navigate("/mutual-fund/large-cap");
  };

  const handleMidCap = () => {
    // Navigate to the mid cap mutual funds page
    navigate("/mutual-fund/mid-cap");
  };

  const handleSmallCap = () => {
    // Navigate to the small cap mutual funds page
    navigate("/mutual-fund/small-cap"); 
  };
  const chartData = {
    labels: ["Large Cap", "Mid Cap", "Small Cap"],
    datasets: [
      {
        data: allocation,
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
      },
    ],
  };

  return (
    <>
      <Header />
      <h1 className="investment-title">Mutual Fund Investment</h1>

      <div className="investment-container">
        <div className="investment-input-section">
          {/* Investment input fields */}
          <div className="total-investment">
            <p>Total Investment</p>
            <input
              type="number"
              placeholder="Enter amount"
              value={totalInvestment}
              onChange={handleInputChange(setTotalInvestment)}
            />
          </div>
          <div className="total-investment">
            <p>Expected Return</p>
            <input
              type="number"
              placeholder="Enter expected return"
              value={expectedReturn}
              max="100"
              onChange={(e) => {
                if (e.target.value > 100) {
                  setExpectedReturn(100);
                  return;
                }
                handleInputChange(setExpectedReturn)(e);
              }}
            />
          </div>
          <div className="total-investment">
            <p>Risk Tolerance</p>
            <input
              type="text"
              placeholder="High, Medium, or Low"
              value={riskTolerance}
              onChange={handleInputChange(setRiskTolerance)}
            />
          </div>
          <div className="total-investment">
            <p>Time Span</p>
            <input
              type="number"
              placeholder="Enter years"
              value={timeSpan}
              onChange={(e) => {
                if (e.target.value > 100) {
                  setTimeSpan(100);
                  return;
                }
                handleInputChange(setTimeSpan)(e);
              }}
            />
          </div>
          <div className="total-investment">
            <button onClick={ handleCalculate }>Submit</button>
          </div>
        </div>

        <div className="investment-graph-section">
          <Doughnut data={chartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Conditional rendering for asset class cards */}
      {showAssetClasses && (
        <div className="asset-class-container">
          <div className="asset-class-card">
            <h1>Large Cap</h1>
            <button onClick={ handleLargeCap}>Explore Now</button>
          </div>
          <div className="asset-class-card">
            <h1>Mid Cap</h1>
            <button onClick={ handleMidCap}>Explore Now</button>
          </div>
          <div className="asset-class-card">
            <h1>Small Cap</h1>
            <button onClick={ handleSmallCap}>Explore Now</button>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestmentCalculator;
