import React, { useState } from 'react';
import './LandingPage.css';
import { signInWithGoogle } from "../../services/firebase";
import { googleSignOut } from "../../services/firebase";


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
                        <a href="https://instagram.com">
                            <img src="instagram.jpg" alt="instagram" width="90" height="90"/>
                        </a>
                    </li>

                    <li>
                        <a href="https://twitter.com"> 
                            <img src="twitter.png" alt="twitter" width="90" height="90"/>
                        </a>
                    </li>

                    <li>
                        <a href="https://tiktok.com">
                            <img src="tiktok.png" alt="tiktok" width="90" height="90"/>
                        </a>
                    </li>

                    <li>
                        <a href="https://youtube.com">
                            <img src="app-icons-youtube.png" alt="youtube" width="90" height="90"/>
                        </a>
                    </li>

                </ul>
            </div>


            <div className="sign">
                <p>---------------------Sign in with ---------------------</p>
                {/* <Link to='../GoogleSSO/GoogleSSO.js'><img src="google.jpeg" alt="google" width="40" height="20"/>Google</Link> */}
                <button type="button"><img src="google.jpeg" alt="google" width="40" height="20" onClick={signInWithGoogle}/></button>
            </div>
        </div>
    );
};

export default LandingPage;
