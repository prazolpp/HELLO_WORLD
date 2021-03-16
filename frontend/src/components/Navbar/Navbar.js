import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/klout_logo.svg';
import Home from '../../assets/images/home.svg';
import Search from '../../assets/images/search.svg';
import Analytics from '../../assets/images/analytics.svg';
import Profile from '../../assets/images/profile.svg';

import './Navbar.css';

const Navbar = ({}) => {

    const [tabNum, setTabNum] = useState(0)

    let homeClass = tabNum !== 0 ? "NavImg": "NavImg Selected"
    let searchClass = tabNum !== 1 ? "NavImg": "NavImg Selected"
    let analyticsClass = tabNum !== 2 ? "NavImg": "NavImg Selected"
    let profileClass = tabNum !== 3 ? "NavImg": "NavImg Selected"



    return (
        <div className="Navbar">
            <div className="logo">
                <Link to="/"> 
                    <img src={Logo} className="logo" alt="klout_logo" /> 
                </Link>
            </div>
            <div className="NavLinks">  
                <Link to="/" onClick={() => {setTabNum(0)}}><div className={homeClass}> <img src={Home} className="icon" alt="home" /><div className="name"> Home </div></div></Link>
                <Link to="/" onClick={() => {setTabNum(1)}}><div className={searchClass}><img src={Search} className="icon" className="icon" alt="search" /><div className="name"> Search </div></div> </Link>
                <Link to="/" onClick={() => {setTabNum(2)}}><div className={analyticsClass}><img src={Analytics} className="icon" alt="analytics" /><div className="name"> Analytics </div></div> </Link>
                <Link to="/" onClick={() => {setTabNum(3)}}><div className={profileClass}><img src={Profile} className="icon" alt="profile" /><div className="name"> Profile </div></div> </Link>
            </div>
        </div>
    )
}

export default Navbar;