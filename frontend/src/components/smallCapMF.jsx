import MutualFundCap from './mutualFundCap';
const SmallCapMF = () => {
    const props = {
        url : "http://localhost:3000/api/v1/mutual-fund/best-small-cap",
        
        FundCategory : "small"
    }
    return (
        <>
            < MutualFundCap {...props} />
        </>
    )
}

export default SmallCapMF;