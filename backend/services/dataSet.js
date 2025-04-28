
const https = require('https');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { parse } = require('json2csv');
const axios = require('axios');
const FormData = require('form-data');

async function detectCandlePatterns(inputPath, outputPath) {
    const data = [];

    // Read and parse the CSV file
    fs.createReadStream(inputPath)
        .pipe(csv())
        .on('data', (row) => {
            const open = parseFloat(row.open);
            const high = parseFloat(row.high);
            const low = parseFloat(row.low);
            const close = parseFloat(row.close);

            // Detect candlestick patterns
            let pattern = 'No Pattern';
            if (close > open && close - open > 0.5 * (high - low)) {
                pattern = 'Bullish Engulfing';
            } else if (open > close && open - close > 0.5 * (high - low)) {
                pattern = 'Bearish Engulfing';
            } else if (low === open && close > (open + (high - low) * 0.6)) {
                pattern = 'Hammer';
            } else if (high === close && open < (low + (high - low) * 0.4)) {
                pattern = 'Shooting Star';
            } else if (Math.abs(open - close) < 0.1 * (high - low)) {
                pattern = 'Doji';
            }

            row.pattern = pattern; // Add the detected pattern
            data.push(row);
        })
        .on('end', () => {
            // Convert back to CSV format
            const fields = Object.keys(data[0]);
            const updatedCsv = parse(data, { fields });

            // Write updated CSV to the output file
            fs.writeFileSync(outputPath, updatedCsv);
            console.log(`Updated CSV file saved as ${outputPath}`);
        });
}

// Function to call the API after the candle patterns are added
async function callModelAPI(filePath) {
    try {
        const form = new FormData();
        form.append('csv_file', fs.createReadStream(filePath));

        const response = await axios.get('http://127.0.0.1:5000/run_model', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        const { test_accuracy, skyrocket_probability } = response.data;

        console.log('Model API response:', response.data);
        return { test_accuracy, skyrocket_probability };
    } catch (error) {
        console.error('Error calling the model API: ', error.message);
        throw new Error('Model API call failed');
    }
}

// Main function to fetch and process the CSV file
async function DataSet(req, res) {
    const symbol = req.query.scripcode || 'IBM';

    if (!symbol || symbol.startsWith('.') || symbol === '.BSE') {
        return res.status(400).send('Invalid stock symbol. Please provide a valid stock name.');
    }

    const apiKey = 'UXVY6D0XGBS6NY6C';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}&datatype=csv`;

    const inputPath = path.join(__dirname, `data.csv`);
    const outputPath = path.join(__dirname, `data_with_patterns.csv`);

    https.get(url, (response) => {
        const file = fs.createWriteStream(inputPath);

        response.pipe(file);

        file.on('finish', async () => {
            file.close();
            console.log(`CSV file saved as ${inputPath}`);

            try {
                // Detect candlestick patterns and save the updated CSV
                await detectCandlePatterns(inputPath, outputPath);

                // Call the API with the updated CSV
                const modelResponse = await callModelAPI(outputPath);

                // Send response back to the client
                res.json({
                    message: `Model run successfully for ${symbol}`,
                    ...modelResponse,
                });
            } catch (error) {
                console.error('Error processing the data:', error.message);
                res.status(500).send('Error processing the data.');
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching the CSV file: ', err.message);
        res.status(500).send('Error fetching the CSV file.');
    });
}

module.exports = DataSet;
