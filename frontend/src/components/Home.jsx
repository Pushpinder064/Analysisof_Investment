import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import VideoComponent from './videoComponent';
import videoSrc from "./resources/banner9.mp4"
function Home() {
    const navigate = useNavigate()
    const handleStock = () => {
        navigate('/stocks')
    }

    const handleMF = () => {
        navigate("/mutual-fund");
    }

    const handleIPO = () => {
        navigate("ipo")
    }

    const handleFO = () => {
        navigate("futures-and-options")
    }
    return(
        <>
            <Header />
            <div className='home-container'>
                <div className='banner'>
                    {/* <VideoComponent src={videoSrc} /> */}
                    <div className='home-banner-heading'>
                        <div className='home-heading'>
                            <h1 className='home-hero-heading-1'>
                                <span>
                                    Analysis of your finance                           
                                </span>
                            </h1>
                            <h2 className='home-hero-heading-2'>Built for growing India</h2>
                        </div>
                    </div>
                    <div className='banner-button'>Get Started</div>
                </div>

                {/* here this is the div where we will show the user the option of the stocks, mutual funds, ipo and F&O */}

                <div className='asset-class'>
                    <div className='asset-class-stock'>
                        <h1>Stocks</h1>
                        <button onClick={handleStock}>Explore Now</button>
                    </div>
                    <div>
                        <h1>Mutual Funds & SIPs</h1>
                        <button onClick={handleMF}>Explore Now</button>
                    </div>
                    <div className='asset-class-ipo'>
                        <h1>IPO</h1>
                        <button onClick={handleIPO}>Explore Now</button>
                    </div>
                    {/* <div>
                        <h1>Futures & Options</h1>
                        <button onClick={handleFO}>Explore Now</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Home;
