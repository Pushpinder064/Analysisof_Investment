// const { default: axios } = require('axios');

// const yahooFinance = require('yahoo-finance2').default;

// async function SearchResult(req, res) {
//   const searchValue = req.query.searchValue; 
//   const assetType = req.query.assetType;

//   if (!searchValue || !assetType) {
//     return res.status(400).send('Missing search value or asset type in query parameters');
//   }

//   try {
//     // The yahooFinance.search function expects an object with the key 'q' for the query.
//     console.log(searchValue)
//     const data = await yahooFinance.search(searchValue);
//     // const data = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=UXVY6D0XGBS6NY6C`)
//     console.log(data);

//     // If you need to filter the results based on the assetType, you can do it here.
//     // const filteredData = data.quotes.filter(
//     //   (item) => item.symbol.toLowerCase().includes(searchValue) && item.quoteType === assetType
//     // );

//     res.json(data.bestMatches);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching data from Yahoo Finance');
//   }
// }

// module.exports = SearchResult;


// const { default: axios } = require('axios');
// const yahooFinance = require('yahoo-finance2').default;

// async function SearchResult(req, res) {
//   const searchValue = req.query.searchValue; 
//   const assetType = req.query.assetType;

//   if (!searchValue || !assetType) {
//     return res.status(400).send('Missing search value or asset type in query parameters');
//   }

//   try {
//     console.log(searchValue);

//     // Making the API call
//     const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`);
    
//     // Accessing the data from the response object
//     const data = response.data;

//     // Checking if the data has the expected structure
//     if (!data || !data.bestMatches) {
//       return res.status(500).send('Unexpected data format received from Alpha Vantage');
//     }

//     console.log(data.bestMatches);

//     // Sending the filtered results back to the client
//     res.json(data.bestMatches);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching data from the API');
//   }
// }

// module.exports = SearchResult;


const axios = require('axios');
const cheerio = require('cheerio'); // We'll use cheerio to parse the HTML

async function SearchResult(req, res) {
  const searchValue = req.query.searchValue; 
  const assetType = req.query.assetType;

  if (!searchValue || !assetType) {
    return res.status(400).send('Missing search value or asset type in query parameters');
  }

  try {
    // Construct the BSE India API URL
    const url = 'https://api.bseindia.com/Msource/1D/getQouteSearch.aspx';
    const params = {
      Type: 'EQ',
      text: searchValue,
      flag: 'site',
    };

    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9',
      'Origin': 'https://www.bseindia.com',
      'Referer': 'https://www.bseindia.com/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    };

    // Fetch data from BSE India API
    const response = await axios.get(url, { headers, params });
    const html = response.data;

    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(html);

    // Extract necessary details from the HTML
    const results = [];
    $('li.quotemenu').each((index, element) => {
      const name = $(element).find('a').text().trim();
      const symbol = $(element).find('span').text().split(' ')[0].trim();
      const url = $(element).find('a').attr('href');
      results.push({ name, symbol, url });
    });

    // Send the results as JSON
    res.json(results);
  } catch (err) {
    console.error('Error fetching data from BSE India API:', err);
    res.status(500).send('Error fetching data from BSE India API');
  }
}

module.exports = SearchResult;
