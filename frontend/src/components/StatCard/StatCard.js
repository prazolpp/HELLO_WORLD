import React, { useState, useEffect } from 'react';
import './StatCard.css';

const StatCard = ({media, number, pastNumber}) => {
    
    {console.log(media)}

    if(media == "Youtube followers"){
        pastNumber = number - 5/100 * number
    }
    if(media == "Youtube views"){
        pastNumber = number - 8/100 * number
    }

    if(media == "Youtube posts"){
        pastNumber = number - 1/100 * number
    }
    
    const percent = Math.round((number - pastNumber)* 10000/pastNumber)/100;
    number = new String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    pastNumber = new String(pastNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    {console.log(number, pastNumber)}
    return(
        <div className="StatCard">
            <div className="textContent">
                <div className="media">
                    {media}
                </div>
                <div className="number">
                    {number}
                </div>
                {/* <div className="percent" style={percent >= 0? {color: "green"} : {color: "red"}}>
                    {percent+"%"}
                </div> */}
            </div>
            <div className="bar">
                <img src="bar.svg" />
            </div>
        </div>
    )
}

export default StatCard;