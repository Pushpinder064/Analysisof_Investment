import React from 'react'
import "./Header.css"
import SearchBar from './SearchBar'
const Header = () => {
    const isLoggedIn = true; 
  return (
    <div className='header'>
      {/* This is the header commponent */}
      {/* Here we will create a log and search bar
      Also the login button if the user has not logged in. */}

      <div className='header-logo'>
        {/* Store the logo */}
        <a href="/">
        {/* <img src="https://logowik.com/content/uploads/images/zerodha6662.jpg" alt="site logo" /> */}

        <img src="https://static.vecteezy.com/system/resources/thumbnails/007/371/777/small/trading-financial-logo-trading-icon-candlestick-trading-trading-stock-symbol-market-chart-sign-vector.jpg" alt="site logo" />
        </a>
      </div>

    {/* Add the Search Bar component */}
    <div className='header-search'>
        <SearchBar />
    </div>

      <div className='header-login'>
        {/* Here we will add the login button, but with a condition if the user session cookie is not set up */}
        <div className='header-login'>
        {!isLoggedIn && (
          <button className='login-button'>Login</button>
        )}
      </div>
      </div>
    </div>
  )
}

export default Header
