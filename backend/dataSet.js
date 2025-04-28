// Import required modules
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const yahooFinance = require('yahoo-finance2').default;

// Array of stock data
const stockData = [
    // {
    //     "name": "Tata Motors",
    //     "symbol" :"TATAMOTORS.BSE"
    // }
    {
        "name": "ITC Limited",
        "symbol": "ITC.NS",
    },
    // {
    //     "name": "Wipro Limited",
    //     "symbol": "WIPRO.NS",
    // },
    // {
    //     "name": "Reliance Industries Limited",
    //     "symbol": "RELIANCE.NS",
    // },
    // {
    //     "name": "Maruti",
    //     "symbol": "MARUTI.NS",
    // },
    // {
    //     "name": "TCS",
    //     "symbol": "TCS.NS",
    // }
];

// Function to iterate thorugh each of the stock and store the data in the local file system
(async function() {
    try{
        for(const stock of stockData){
            const csvData = await jsonToCSV(stock.symbol);
            const filePath = path.join(__dirname, "dataset", `${stock.name}.csv`)
            
            fs.writeFileSync(filePath, csvData);
            console.log(`Data Set for ${stock.name} has been stored at ${filePath}`)
        }
    }
    catch(error){
        console.log("Error occur while getting the data of the stocks from yahoo finance" + `${error}`)
    }
})();

// Function to fetch the data from yahoo-finance and send it into csv format

async function jsonToCSV(query){
    // get the data from yahoo site in the json
    const queryOptions = { period1: '2020-01-01', period2: '2024-07-16', interval: '1mo' };
    const jsonData = await yahooFinance.historical(query, queryOptions);

    // convert that json data into csv
    let csv = "";
    let keys = Object.keys(jsonData[0]);
    
    csv += keys.join(",") + "\n";
    jsonData.forEach((item) => {
        // Here date is in this format -> "Wed Jan 01 2020 05:30:00 GMT+0530 (India Standard Time)" but i want it in 
        // -> "Wed Jan 01 2020"
        item.date = item.date.toString().split(" ").slice(0, 4).join(" ");
        csv += keys.map(key => item[key]).join(',') + "\n"
    });

    return csv;
}