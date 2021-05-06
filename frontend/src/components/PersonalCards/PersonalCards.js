import React, { useEffect, useState } from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import './PersonalCards.css'
import {userContext} from '../../userContext';

const PersonalCards = ({username, img}) => {
    const sendEmail = () => {
        //add functionality
        console.log("shared the card!!")
        return 
    }
    let cards = [
        [
            {
                name:"youtube",
                username:"pewdiepie"
            }, 
            {
                name:"twitter",
                username:"pewdiepie",
            },
            {
                name:"instagram",
                username:"pewdiepie"
            }
        ],
        [
            {
                name:"youtube",
                username:"elonmusk"
            }, 
            {
                name:"twitter",
                username:"elonmusk",
            },
            {
                name:"instagram",
                username:"elonmusk"
            }
        ],
        
        

    ]

    let businessCards = ""
    businessCards = cards.map((card, i) => <BusinessCard username={username} img={img} info={card} sendEmail={sendEmail}/>)
    return(
        <div className="allCards">{businessCards}</div>
    ) 
}

export default PersonalCards;