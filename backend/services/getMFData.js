const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

dotenv.config();

async function GetMFDataSet(req, res) {
    const scripcode = req.query.scripcode;
    console.log(scripcode);
    try {
        // Call the function to get the mutual fund data (NAV values)
        const data = await MutualFundData(scripcode);

        // Console for debugging purpose
        // console.log(data);

        // Call the function to convert the JSON data to CSV
        const inputPath = await saveJsonToCsv(data);

        
        const result = await callModelAPI(inputPath);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching mutual fund data:', error);
        res.status(500).send('An error occurred while fetching mutual fund data');
    }
}

// Function to call the API after the candle patterns are added
async function callModelAPI(filePath) {
    try {
        const form = new FormData();
        form.append('csv_file', fs.createReadStream(filePath));

        const response = await axios.get('http://127.0.0.1:5000/predict-mutual-fund', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        const {accuracy , prediction, prediction_label } = response.data;

        // console.log('Model API response:', response.data);
        return { accuracy, prediction, prediction_label };
    } catch (error) {
        console.error('Error calling the model API: ', error.message);
        throw new Error('Model API call failed');
    }
}
async function MutualFundData(scripcode) {
    const time = 0;
    const url = process.env.StockData + `${time}` + `&scripcode=${scripcode}`;

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://www.bseindia.com',
        'Referer': 'https://www.bseindia.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    };

    try {
        const result = await axios.get(url, { headers });
        // console.log(result.data)
        return result.data.Data;
    } catch (error) {
        console.error('Error in MutualFundData:', error);
        throw error; // Propagate the error to be handled by the calling function
    }
}

// Function to format date to YYYY-MM-DD
function formatDate(dttm) {
    const date = new Date(dttm);
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
}

// Function to save JSON to CSV with formatted date and without quotes
async function saveJsonToCsv(jsonData) {
    try {
        // Parse the JSON data into an array
        const dataArray = JSON.parse(jsonData);

        // Format the `dttm` field in each object
        const formattedData = dataArray.map(item => ({
            ...item,
            dttm: formatDate(item.dttm),
        }));

        // Define the fields for the CSV
        const fields = ['dttm', 'vale1', 'vole'];
        const json2csvParser = new Parser({
            fields,
            quote: "" // Disable quoting of field values
        });

        // Convert JSON array to CSV
        const csv = json2csvParser.parse(formattedData);

        // Write the CSV to a file in the current directory
        const filePath = path.join(__dirname, 'MFData.csv');
        fs.writeFileSync(filePath, csv);

        console.log(`CSV file successfully created at ${filePath}`);
        return filePath;
    } catch (error) {
        console.error('Error converting JSON to CSV:', error);
    }
}

module.exports = GetMFDataSet;
