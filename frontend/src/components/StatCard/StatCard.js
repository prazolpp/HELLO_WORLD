import React, { useState, useEffect } from 'react';
import './StatCard.css';

const StatCard = ({media, number, pastNumber}) => {
    number = new String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return(
        <div className="StatCard">
            <div className="textContent">
                <div className="media">
                    {media}
                </div>
                <div className="number">
                    {number}
                </div>
            </div>
            <div className="bar">
                <img src="bar.svg" />
            </div>
        </div>
    )
}

export default StatCard;