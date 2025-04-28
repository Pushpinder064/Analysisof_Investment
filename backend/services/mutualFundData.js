const dotenv = require('dotenv');
const axios = require('axios');
const { head } = require('../routes/stockInfo');

dotenv.config()

async function MutualFundData(req, res) {
    const scripcode = req.query.scripcode;
    const time = 0;
    const url = process.env.StockData + `${time}` + `&scripcode=${scripcode}`
    // console.log(scripcode);
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
        res.status(200).send(result.data.Data);
    }catch(error){
        console.log(error);
    }
}

module.exports = MutualFundData;