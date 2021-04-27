import React, { useState } from 'react';
import Status from '../Status/Status';
import BusinessCard from '../BusinessCard/BusinessCard';
import MyStats from '../MyStats/MyStats';
import Share from '../Share/Share';
import './HorizontalNav.css';

const HorizontalNav = (props) => {
    const [navState, setNavState] = useState(0);

    const showBox = (num) => {
        setNavState(num);
    };

    let classNames = ["tab","tab", "tab","tab"].map((e,i) => {
        if(i == navState){
            return "tab selected-tab"
        }
        return "tab"
    })

    const status = navState == 0 && <Status />;
    const mystats = navState == 1 && <MyStats/>;
    const businesscard = navState == 2 && <BusinessCard />;
    const share = navState == 3 && <Share />;

    return (
        <div className="UserProfile">
            <div className="profile-tab-nav">
                <div className={classNames[0]} onClick={() => {showBox(0)}}>
                    Status
                </div>
                <div className={classNames[1]} onClick={() => {showBox(1)}}>
                    Stats
                </div>
                <div className={classNames[2]} onClick={() => {showBox(2)}}>
                    Business Card
                </div>
                <div className={classNames[3]} onClick={() => {showBox(3)}}>
                    Share
                </div>
            </div>

            <div className="tab-container">
                {status}
                {mystats}
                {businesscard}
                {share}
            </div>
        </div>
    );
};

export default HorizontalNav;