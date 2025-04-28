// const axios = require('axios');

// const headers = {
//   'Accept': 'application/json, text/plain, */*',
//   'Accept-Encoding': 'gzip, deflate, br, zstd',
//   'Accept-Language': 'en-US,en;q=0.9',
//   'Origin': 'https://www.bseindia.com',
//   'Referer': 'https://www.bseindia.com/',
//   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
// };

// axios.get('https://api.bseindia.com/BseIndiaAPI/api/MktRDropdownData/w', { headers })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


const axios = require('axios');
const express = require('express')
const app= express();


// URL to be used for top gainers and loser
// const url = 'https://api.bseindia.com/BseIndiaAPI/api/MktRGainerLoserDataeqto/w';


// URL to be used for getting the PE, SECTOR, SUB SECTOR AND OTHER RELATED INFORMATION 
// const url = `https://api.bseindia.com/BseIndiaAPI/api/ComHeadernew/w?quotetype=EQ&scripcode=500400&seriesid=`


// this url is for getting data of the stock.
const url = `
https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=532667&flag=5d&fromdate=&todate=&seriesid=`

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



    // This is for top gainers and losers 

  // app.get('/gainer', async(req, res) => {
  //   axios.get(url, { headers, params })
  // .then(response => {
  //   console.log(response.data);
  //   res.send(response.data)
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error);
  // });
  // })

  app.get('/gainer', async(req, res) => {
    axios.get(url, { headers })
  .then(response => {
    console.log(response.data);
    res.send(response.data.Data)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  })
  const { spawn } = require('child_process');


  // Assume this is your route that runs the Python script
// app.get('/run', (req, res) => {
//   const spawn = require('child_process').spawn;
//   const py = spawn('python', ['python.py']);

//   py.stdout.on('data', (data) => {
//       // Ensure this part is only called once
//       if (!res.headersSent) {
//           res.send(data.toString()); // Send the result to the client
//       }
//   });

//   py.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`);
//       if (!res.headersSent) {
//           res.status(500).send('Error occurred');
//       }
//   });

//   py.on('close', (code) => {
//       console.log(`child process exited with code ${code}`);
//   });
// });

app.get('/run', (req, res) => {
  // Set environment variable to use UTF-8 encoding
  const py = spawn('python', ['python.py'], {
      env: { ...process.env, 'PYTHONIOENCODING': 'utf-8' }
  });

  // Handle stdout data from the Python script
  py.stdout.on('data', (data) => {
      // Convert buffer to string with utf-8 encoding
      const output = data.toString('utf-8');
      if (!res.headersSent) {
          res.write(output); // Send the result to the client
      }
  });

  // Handle stderr data from the Python script
  py.stderr.on('data', (data) => {
      console.error(`stderr: ${data.toString('utf-8')}`);
      if (!res.headersSent) {
          res.status(500).send('Error occurred');
      }
  });

  // Handle the close event of the Python process
  py.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if (!res.headersSent) {
          res.end(); // Ensure the response is ended
      }
  });
});

  app.listen(3002, () => {
    console.log("Server is running on: port 3002")
  })