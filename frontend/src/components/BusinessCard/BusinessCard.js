import React, { useState } from 'react';
import './BusinessCard.css';
import 'font-awesome/css/font-awesome.min.css';
import ShareButton from '../ShareButton/ShareButton'

const BusinessCard = ({username, img, info=[], sendEmail}) => {

    let medias = ""
    medias = info.map((media, i) => <li><a className="link" href={`https://www.${media.name}.com/${media.username}`} target="_blank"><i className={`fa fa-${media.name}`}></i>{"   "+ media.username}</a></li>)

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
        <ShareButton sendEmail={sendEmail}/>
    </div>
    )
}
export default BusinessCard