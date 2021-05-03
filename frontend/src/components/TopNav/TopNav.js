import React, { useState, useEffect } from 'react';
import './TopNav.css';
import SearchBar from '../SearchBar/SearchBar.js'
import Dropdown from '../Dropdown/Dropdown';

const TopNav = ({username, setUsername, platform, handleChange}) => {
    const options = ["All","Instagram", "Twitter", "Youtube", "Tiktok"]

    return (
        <div className="TopNav">
            <Dropdown options={options} optionNames={options} dropdownOpen={platform} handleChange={handleChange} />
            <button className="signout" >Sign Out</button>
        </div>
    )
}

export default TopNav