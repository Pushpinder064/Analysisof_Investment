import React from 'react'
import Asset from './asset'

const MutualFund = () => {
  const data = {
    header1 : "Build wealth, SIP by SIP.",
    header2 : "Invest in Direct Mutual Funds.",
    
    
    SpanData_part_one : "5000+ mutual funds,",
    SpanData_part_two : "find the best ones on Groww.",
    
    first_div_header1 : "Everything in one place ",
    first_div_header2 : "Get detailed info" ,

    // TODO: This should point to some other url
    link : "mutual-fund-market" 
  }
  return (
    <>

       <Asset {... data} />
    </>
  )
}

export default MutualFund
