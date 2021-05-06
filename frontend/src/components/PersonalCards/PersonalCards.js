import React, { useEffect, useState } from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import './PersonalCards.css'
import {userContext} from '../../userContext';

const PersonalCards = ({username, img, cards}) => {
    const sendEmail = () => {
        //add functionality
        alert("shared the card!!")
        return 
    }

    let businessCards = ""
    businessCards = cards.map((card, i) => <BusinessCard username={username} img={img} info={card} sendEmail={sendEmail}/>)
    return(
        <div className="allCards">{businessCards}</div>
    ) 
}

export default PersonalCards;