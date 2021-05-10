import React, { useEffect, useState } from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import './FriendsCards.css'
import {userContext} from '../../userContext';

const FriendsCards = ({fcards}) => {

    let businessCards = ""
    businessCards = Object.keys(fcards).map((cardnum, i) => <BusinessCard key={i} cardnum={cardnum} info={fcards[cardnum]} />)
    return(
        <div className="allCards">{businessCards}</div>
    ) 
}

export default FriendsCards;