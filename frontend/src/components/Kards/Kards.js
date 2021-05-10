import React, { useEffect, useState } from 'react';
import PersonalCards from '../PersonalCards/PersonalCards';
import BusinessCard from '../BusinessCard/BusinessCard';
import FriendsCards from '../FriendsCards/FriendsCards'
import './Kards.css';
import AddCard from '../AddCard/AddCard';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getCards } from '../../apis/apis'
import { userContext } from '../../userContext';

 
const Kards = ({name, img}) => {
    const [navState, setNavState] = useState(1);
    const [cards, setCards] = useState({})
    const [fcards, setFcards] = useState({})

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

        let freqObj = {
            url: `${getCards}/${userContext.value.uid}/sharedCards`,
            method: 'GET'
        }
        sendRequest(freqObj).then((data) => {
            console.log("fcards")
            console.log(data)
            if(Object.keys(data).length){
                let newcards = {...fcards, ...data}
                // setCards(newcard)
                // console.log(data)
                // console.log(cards, "cards")
                if(newcards != fcards){
                    setFcards(newcards);
                    return
                }
            }
            return
        })
    },[])

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
    
    // const stats = navState == 0 && <MyStats/>;
    const personalcards = navState == 1 &&  <PersonalCards cards={cards}/>;
    const friendscards = navState == 2 && <FriendsCards fcards={fcards} />;
    const addcard = navState == 3 && <AddCard username={name} img={img} cardAdder={cardAdder}/>;

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
                {friendscards}
                {addcard}
            </div>
        </div>
    );
};

export default Kards;