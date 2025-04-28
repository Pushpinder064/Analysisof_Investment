import React from 'react'
import Asset from './asset'

const Stocks = () => {
  const data = {
    header1 : "EffortLess Investing",
    header2 : "Invest In Stocks",

    SpanData_part_one : "Power-packed with",
    SpanData_part_two : "everything you need",
    
    first_div_header1 : "Market is a snapshot",
    first_div_header2 : "Simplified enough fot Bengineers", 

    link : "market"
  }
  return (
    <>
       <Asset {... data} />
    </>
  )
}

export default Stocks
