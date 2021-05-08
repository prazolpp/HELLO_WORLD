import React, { useEffect, useState } from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import './PersonalCards.css'
import {userContext} from '../../userContext';

const PersonalCards = ({username, img, cards}) => {

    let businessCards = ""
    businessCards = Object.keys(cards).map((cardnum, i) => <BusinessCard key={i} cardnum={cardnum} username={username} img={img} info={cards[cardnum]} />)
    return(
        <div className="allCards">{businessCards}</div>
    ) 
}

export default PersonalCards;