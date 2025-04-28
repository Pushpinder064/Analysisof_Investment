const dotenv = require('dotenv')
const axios = require('axios');
dotenv.config()

async function GetFundamentals(req, res) {
    const scripcode = req.query.scripcode; // If coming from query params
    // console.log("Received Scripcode:", scripcode); // Debugging

    const url = process.env.fundamentals_url + `&scripcode=${scripcode}&seriesid=`;
    // console.log(url);

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
        res.status(200).send(result.data);
    } catch (error) {
        console.log(`Error while getting the fundamentals information of the stock. Route -> backend -> services -> fundamentals.js. Error Message: ${error}`);
        res.status(500).send("Error fetching data");
    }
}


module.exports = GetFundamentals;