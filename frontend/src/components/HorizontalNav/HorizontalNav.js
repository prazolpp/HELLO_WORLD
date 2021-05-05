import React, { useState } from 'react';
import PersonalCards from '../PersonalCards/PersonalCards';
import BusinessCard from '../BusinessCard/BusinessCard';
import MyStats from '../MyStats/MyStats';
import Share from '../Share/Share';
import './HorizontalNav.css';

const HorizontalNav = ({name, img}) => {
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

    const personalcards = navState == 0 && <MyStats/>;
    const mystats = navState == 1 &&  <PersonalCards username={name} img={img} />;
    const businesscard = navState == 2 && <BusinessCard username={name} img={img}/>;
    const share = navState == 3 && <Share />;

    return (
        <div className="UserProfile">
            <div className="profile-tab-nav">
                <div className={classNames[0]} onClick={() => {showBox(0)}}>
                    Personal 
                </div>
                <div className={classNames[1]} onClick={() => {showBox(1)}}>
                    Personal Business Cards
                </div>
                <div className={classNames[2]} onClick={() => {showBox(2)}}>
                    Business Card
                </div>
                <div className={classNames[3]} onClick={() => {showBox(3)}}>
                    Share
                </div>
            </div>

            <div className="tab-container">
                {personalcards}
                {mystats}
                {businesscard}
                {share}
            </div>
        </div>
    );
};

export default HorizontalNav;