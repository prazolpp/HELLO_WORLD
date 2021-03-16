import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/klout_logo.svg';
import Home from '../../assets/images/home.svg';
import Search from '../../assets/images/search.svg';
import Analytics from '../../assets/images/analytics.svg';
import Profile from '../../assets/images/profile.svg';

import './Navbar.css';

const Navbar = ({}) => {

    const [tabNum, setTabNum] = useState(0)

    return (

        <div class="Navbar">
            <div className="logo">
                <Link to="/"> 
                    <img src={Logo} className="logo" alt="klout_logo" /> 
                </Link>
            </div>
            <div className="NavLinks">  
                <Link to="/"><img src={Home} className="NavImg" alt="home" /> </Link>
                <Link to="/"><img src={Search} className="NavImg" alt="klout_logo" /> </Link>
                <Link to="/"><img src={Analytics} className="NavImg" alt="klout_logo" /> </Link>
                <Link to="/"><img src={Profile} className="NavImg" alt="klout_logo" /> </Link>
            </div>
        </div>
    )
}

export default Navbar;