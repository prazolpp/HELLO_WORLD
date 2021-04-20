import React, { useState, useEffect } from 'react';
import './StatCard.css';

const StatCard = ({media, number, pastNumber}) => {
    
    const percent = Math.round((number - pastNumber)* 10000/pastNumber)/100;

    return(
        <div className="StatCard">
            <div className="textContent">
                <div className="media">
                    {media}
                </div>
                <div className="number">
                    {number}
                </div>
                <div className="percent" style={percent >= 0? {color: "green"} : {color: "red"}}>
                    {percent+"%"}
                </div>
            </div>
            <div className="bar">
                <img src="bar.svg" />
            </div>
        </div>
    )
}

export default StatCard;