import React, { useState } from 'react';
import PersonalCards from '../PersonalCards/PersonalCards';
import BusinessCard from '../BusinessCard/BusinessCard';
import MyStats from '../MyStats/MyStats';
import Share from '../AddCard/AddCard';
import './HorizontalNav.css';
import AddCard from '../AddCard/AddCard';

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

    // const stats = navState == 0 && <MyStats/>;
    const personalcards = navState == 1 &&  <PersonalCards username={name} img={img} />;
    const businesscard = navState == 2 && <BusinessCard username={"James Maddison"} img={img}/>;
    const share = navState == 3 && <AddCard />;

    return (
        <div className="UserProfile">
            <div className="profile-tab-nav">
                {/* <div className={classNames[0]} onClick={() => {showBox(0)}}>
                    Personal Info
                </div> */}
                <div className={classNames[1]} onClick={() => {showBox(1)}}>
                    Personal Business Cards
                </div>
                <div className={classNames[2]} onClick={() => {showBox(2)}}>
                    Friends' Business Cards
                </div>
                <div className={classNames[3]} onClick={() => {showBox(3)}}>
                    Add Card
                </div>
            </div>

            <div className="tab-container">
                {personalcards}
                {/* {mystats} */}
                {businesscard}
                {share}
            </div>
        </div>
    );
};

export default HorizontalNav;