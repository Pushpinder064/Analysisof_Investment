import './App.css';
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Stocks from './components/stocks';
import MutualFund from './components/mutualFund';
import Market from './components/market';
import StockInfo from './components/stockInfo';
import LargeCapMF from './components/largeCapMF';
import InvestmentCalculator from './components/investmentCalculator';
import SmallCapMF from './components/smallCapMF';
import MidCapMF from './components/midCapMF';
import MutualFundInfo from './components/mutualFundInfo';
import MutualFundMarket from './components/mtualFundMarket';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element= {<Login />}></Route>
      <Route path='/search' element = { <Stocks />} ></Route>
      <Route path='/stocks' element = { <Stocks />} ></Route>
      <Route path='market' element = { < Market />} ></Route>
      <Route path='/mutual-fund' element = { < MutualFund /> }></Route>
      {/* <Route path='/stock/:stock-name/:stock-id' element= { < StockInfo />}></Route> */}
      
     


      <Route path='/stock/:stock_id' element= { < StockInfo />}></Route>
      <Route path='/mutual-fund/large-cap' element= { < LargeCapMF />}></Route>
      <Route path='/mutual-fund/small-cap' element= { < SmallCapMF />}></Route>
      <Route path='/mutual-fund/mid-cap' element= { < MidCapMF />}></Route>
      {/* TODO: Create a jsx page for mutual fund details */}
      {/* <Route path='/mutual-fund/:mf_id' element= { < StockInfo />}></Route> */}
      <Route path='/mutual-fund-market' element= { < MutualFundMarket />}></Route>
      <Route path='/mutual-fund/:stock_id' element= { < MutualFundInfo />}></Route>
      {/* Route for the diversification page */}
      <Route path='/mf-investment-calculator' element= { < InvestmentCalculator />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
