import MutualFundCap from './mutualFundCap';
const MidCapMF = () => {
    const props = {
        url : "http://localhost:3000/api/v1/mutual-fund/best-mid-cap",
        
        FundCategory : "mid"
    }
    return (
        <>
            < MutualFundCap {...props} />
        </>
    )
}

export default MidCapMF;