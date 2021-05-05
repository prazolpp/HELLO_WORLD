import React, { useState } from 'react';
import './BusinessCard.css';

const BusinessCard = () => {
    return (
        <div className="card">
        <img src="https://lh3.googleusercontent.com/pZwZJ5HIL5iKbA91UGMUIPR0VJWa3K0vOGzDZmY6wU3EJBUdfsby3VEyxU162XxTyOyP3D154tjkr-4Jgcx8lygYUR8eB-jVmld4dsHi1c-mE_A8jKccseAG7bdEwVrcuuk6ciNtSw=s170-no"
            alt="Person" className="card__image" />
        <p className="card__name">John Brown</p>

        <ul className="social-icons">
            <li>
                <a href="http://your_url_here.html" target="_blank"><i className="fa fa-instagram"> Instagram</i></a>
            </li>

            <li>
                <a href="http://your_url_here.html" target="_blank"><i className="fa fa-twitter"> Twitter</i></a>
            </li>

            <li>
                <a href="http://your_url_here.html" target="_blank"><i className="fa fa-youtube"> YouTube</i></a>
            </li>
        </ul>
    </div>
    )
}
export default BusinessCard