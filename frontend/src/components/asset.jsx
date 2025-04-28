import React from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

import { useNavigate } from 'react-router-dom';

import './asset.css'
// const element = <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" />
const Asset = ({ header1, header2, SpanData_part_one, SpanData_part_two, first_div_header1, first_div_header2, link}) => {
  
  const naviagte = useNavigate();
  const handleClick = () => {
    naviagte(`/${link}`);
  }

  return (
   <>
      <Header />
      <div className='asset-page'>
        <div className='asset-page-banner'>
          {/* <h1>EffortLess Investing</h1> */}
          <h1>{header1}</h1>
          {/* <h2>Invest In Stocks</h2> */}
          <h2>{header2}</h2>
          <img src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/stocksHeader.96834ea8.webp" alt=  "stock_image" />
        </div>

        <div className='asset-expression-area'>
          {/* here add the icon & description*/}
          <FontAwesomeIcon icon={faWandMagicSparkles} />

          <span>
            {/* Power-packed with */}
            {SpanData_part_one}
            <br />
            {/* everything you need. */}
            {SpanData_part_two}
          </span>

        </div>

        {/* Here cerate 1 box that will be having the information to the other asset classes with the link to there respective pages */}
        <div className='asset-class-area-blocks'>
          {/* here we cerate 1 div that will be having some height and width and that div will be having a speacial flex direction despite of their parent div */}

          <div className='market-at-foot-step'>
            {/* <h1>Market is a snapshot.</h1> */}
            <h1>{first_div_header1}</h1>
            {/* <h3>Simplified enough for Begineers</h3> */}
            <h3>{first_div_header2}</h3>

            <button 
              onClick={handleClick}
            >Try it out</button>
          </div>
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRXuE_LR04cUOoXMbYoRMtRzTi8C-IIyzrIwalsOE-DVvrEF4vv" alt="site logo" />
        </div>
      </div>
   </>
  )
}

export default Asset
