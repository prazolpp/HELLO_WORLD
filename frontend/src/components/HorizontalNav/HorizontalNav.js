import React, { useEffect, useState } from 'react';
import PersonalCards from '../PersonalCards/PersonalCards';
import BusinessCard from '../BusinessCard/BusinessCard';
import MyStats from '../MyStats/MyStats';
import Share from '../AddCard/AddCard';
import './HorizontalNav.css';
import AddCard from '../AddCard/AddCard';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getCards } from '../../apis/apis'
import { userContext } from '../../userContext';

 
const HorizontalNav = ({name, img}) => {
    const [navState, setNavState] = useState(1);
    const [cards, setCards] = useState({
        "11111":{
            youtube: "pewdiepie",
            twitter: "pewdiepie",
            instagram: "pewdiepie"
        }
    })

    useEffect(() => {
        let reqObj = {
            url: `${getCards}/${userContext.value.uid}/myCards`,
            method: 'GET'
        }
        sendRequest(reqObj).then((data) => {
            console.log("cards")
            console.log(data)
            if(Object.keys(data).length){
                let newcards = {...cards, ...data}
                // setCards(newcard)
                // console.log(data)
                // console.log(cards, "cards")
                if(newcards != cards){
                    setCards(newcards);
                    return
                }
            }
            return
        })
    },cards)

    const cardAdder = (addedcards) => {
        let newcards = {...cards, ...addedcards}
        if(newcards != cards){
            setCards(newcards);
        }
    }

    const showBox = (num) => {
        setNavState(num);
    };

    let classNames = ["tab","tab", "tab","tab"].map((e,i) => {
        if(i == navState){
            return "tab selected-tab"
        }
        return "tab"
    })

    let friendcard = {
        youtube:"cr7",
        twitter: "cristiano",
        instagram: "cristiano"
    }
    const friendimg = "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec593cc431fb70007482137%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1321%26cropX2%3D3300%26cropY1%3D114%26cropY2%3D2093"
    // const stats = navState == 0 && <MyStats/>;
    const personalcards = navState == 1 &&  <PersonalCards username={name} img={img} cards={cards}/>;
    const businesscard = navState == 2 && <BusinessCard username={"Cristiano"} info={friendcard} img={friendimg} />;
    const addcard = navState == 3 && <AddCard cardAdder={cardAdder}/>;

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
                {addcard}
            </div>
        </div>
    );
};

export default HorizontalNav;