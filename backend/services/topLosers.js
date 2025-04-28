const dotenv = require('dotenv')
const axios = require('axios')

async function TopLosers(req, res) {
    const url = process.env.gainer_loser_URL;

    const params = {
        GLtype: 'loser',
        IndxGrp: 'AllMkt',
        IndxGrpval: 'AllMkt',
        orderby: 'all',
    };
    
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://www.bseindia.com',
        'Referer': 'https://www.bseindia.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    };

    try{
        const result = await axios.get(url, { headers, params })
        res.status(200).send(result.data.Table);
    }
    catch(err) {
        console.log('Error while fetching the data: ', err);    
    }
}

module.exports = TopLosers;