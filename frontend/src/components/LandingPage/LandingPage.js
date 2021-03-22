import React, { useState } from 'react';
import './LandingPage.css';


const LandingPage = ({}) => {

    const getStarted = () => {
    
    };

    return (
        <div className="LandingPage">
            <div className="welcomeKlout">
                <img src="ruby.png" alt="ruby" width="140" height="100" />
                <h1>Welcome to Klout</h1>
                <p>Your personal social media manager</p>
            </div>


            <div className="line">
                <h2>Track your social engagement with ease!</h2>
            </div>

            <div className="logos">
                <ul>
                    <li>
                        <img src="instagram.jpg" alt="instagram" width="90" height="90"/>
                        <h4>Instagram</h4>
                    </li>

                    <li>
                        <img src="twitter.png" alt="twitter" width="90" height="90"/>
                        <h4>Twitter</h4>
                    </li>

                    <li>
                        <img src="tiktok.png" alt="tiktok" width="90" height="90"/>
                        <h4>TikTok</h4>
                    </li>

                    <li>
                        <img src="app-icons-youtube.png" alt="youtube" width="90" height="90"/>
                        <h4>YouTube</h4>
                    </li>

                </ul>
            </div>


            <div className="sign">
                <p>---------------------Sign in with ---------------------</p>
                <button type="button"><img src="google.jpeg" alt="google" width="40" height="20"/></button>
            </div>
        </div>
    );
};

export default LandingPage;