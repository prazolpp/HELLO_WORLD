import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import 'font-awesome/css/font-awesome.min.css';

const SearchPage = ({}) => {

    return (
        <div className="SearchPage">
            <div className="text">
                <input type="button" value="Sign Out" />
            </div>

            <div className="main">
                <h5>Popular Inflencers</h5>
                    <li>
                        <img className="Justin" src="Justin_Bieber.jpeg" alt="Justin"/>
                    </li>
                    <li>
                        <img className="Weekend" src="weekend.jpeg" alt="theweekend" />
                    </li>
                    <li>
                        <img className="Kylie" src="KylieJenner.jpeg" alt="KylieJenner" />
                    </li>
                    <li>
                        <img className="Ariana" src="Ariana-Grande.jpeg" alt="Ariana" />
                    </li>
            </div>

            <div className="container">
                <input type="text" placeholder="Search" />
                <a href=""><i className="fa fa-search"> </i> </a>
            </div>

            <div className="logos">
                <ul>
                    <li>
                        <img src="instagram.jpg" alt="instagram" width="90" height="90" />
                    </li>
                    <li>
                        <img src="twitter.png" alt="twitter" width="90" height="90" />
                    </li>
                    <li>
                        <img src="tiktok.png" alt="tiktok" width="90" height="90" />
                    </li>
                    <li>
                        <img src="app-icons-youtube.png" alt="youtube" width="90" height="90" />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchPage;