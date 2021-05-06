import React, { useState } from 'react';
import './BusinessCard.css';
import 'font-awesome/css/font-awesome.min.css';
import ShareButton from '../ShareButton/ShareButton'

const BusinessCard = ({username, img, cardnum, info={}, sendEmail}) => {

    let medias = ""
    let cardNum = cardnum
    medias = Object.keys(info).map((media, i) => <li key={i} ><a className="link" href={`https://www.${info[media]}.com/${info[media]}`} target="_blank"><i className={`fa fa-${media}`}></i>{"   "+ info[media]}</a></li>)

    return (
        <div className="card">
        <img src={img}
            alt="Person" className="card__image" />
        <p className="card__name">{username}</p>

        
        <ul className="social-icons">
            {medias}
             {/* <li>q
                <a href="http://your_url_here.html" target="_blank"><i className="fa fa-instagram"> Instagram</i></a>
            </li>

            <li>
                <a href="http://your_url_here.html" target="_blank"><i className="fa fa-twitter"> Twitter</i></a>
            </li>

            <li>
                <a href="http://your_url_here.html" target="_blank"><i className="fa fa-youtube"> YouTube</i></a>
            </li>  */}
        </ul>
        <ShareButton />
    </div>
    )
}
export default BusinessCard