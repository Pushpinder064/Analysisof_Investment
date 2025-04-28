const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config();

const largeCapFundData = [
    {
        "name": "ICICI Prudential Nifty Next 50 Index Direct Growth",
        "scripcode": "541809"
    },
    {
        "name": "UTI NIFTY 50 ETF",
        "scripcode": "539313"
    }, 
    {
        "name": "NAVI NIFTY 50 ETF",
        "scripcode": "543987"
    },
    {
      "name": "DSP Nifty 50 Equal Weight",
      "scripcode": "543388"  
    }, 
    {
        "name": "SBI Mutual Fund - SBI",   
        "scripcode": "539031"
    }
];

// Function to get additional data for each fund
const getFundData = async (scripcode) => {
    try {
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Origin': 'https://www.bseindia.com',
            'Referer': 'https://www.bseindia.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
        };

        // Replace this with your actual API URL
        const URL = process.env.largeCapFund + `${scripcode}` + `&seriesid=`;
        const response = await axios.get(URL, { headers });
        return response.data.CurrRate;  // Assuming you want the CurrRate part of the data
    } catch (error) {
        // console.error(`Error fetching data for scripcode ${scripcode}:`, error);
        return URL; // Return null or default if the request fails
    }
};

const largeCapMF = async (req, res) => {
    try {
        const promises = largeCapFundData.map(async (fund) => {
            const additionalData = await getFundData(fund.scripcode);
            return {
                ...fund,
                additionalData  // Merge the additional data with the original fund data
            };
        });

        const combinedData = await Promise.all(promises);
        // console.log(combinedData)
        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mutual fund data", error });
    }
};

module.exports = largeCapMF;
