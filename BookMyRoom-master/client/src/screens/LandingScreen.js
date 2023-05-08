import React from "react";
import { Link } from "react-router-dom";

function LandingScreen() {
    return (
        <div className="row landing justify-content-center">
            <div className="col-md-8 my-auto text-center" style={{borderRight:'8px solid white'}}>
                <h3 style={{color:"white" , fontSize:'90px'}}>BookMyRoom</h3>
                <h1 style={{color:"white"}}> "There is only one boss. The guest....."</h1>
                <Link to='/home'>
                    <button className="btn landingbtn">Get Started</button>
                </Link>
            </div>
        </div>
    )
};

export default LandingScreen;