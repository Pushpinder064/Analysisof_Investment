const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();


async function CurrRate(req, res){
    const scripcode = req.query.scripcode;

    const url = process.env.currRate + `${scripcode}&seriesid=`;
    // console.log(url);
    

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://www.bseindia.com',
        'Referer': 'https://www.bseindia.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    };

    try{
        const result = await axios.get(url, { headers });
        res.status(200).send(result.data);
    }catch(error){
        console.log("Error while fetching the curr rate of the stock. Error is occuring in the ./backend/services/currRate.js. Error message: ", error);
        res.status(500).send("Error while fetching the data.")
    }
}

module.exports = CurrRate;