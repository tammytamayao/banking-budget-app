import React from "react";
import NavBar from "./NavBar";
import homePageVector from '../homePageVector.png';
import handLogo from '../handlogo.jpeg';
import './HomePage.css';

const HomePage = () => {

return (
    <div className="homePageContainer">
    <NavBar />
    <section className="homeBody">
    <div className="homeLeft">
        <div className="homeLogo">
            <span className='logoBlackL'>BANK<span className='logoGoldL'>OK</span></span>
            <img src={handLogo} id="handLogo" alt='HPIcon'/>
        </div>
        <div className="homeText">As one of the leading banks in Avion School Batch 21, we have established a history of client trust, financial strength, and innovation. Since 2022, our business, products and services have played a significant role in every Avion Student’s daily life, as well as in the country’s increasingly expanding and evolving economy.</div>
    </div>
    <div className="homeRight">
        <div id="homeImgCont"><img src={homePageVector} id="homePageVector" alt='HPIcon'></img></div>
    </div>
    </section>
    <footer>Princess Tamayao and Emman Perez - Avion School Batch 21 </footer>
    </div>
    );
}


export default HomePage;