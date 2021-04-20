import React, { useState, useEffect } from 'react';
import './TopNav.css';
import SearchBar from '../SearchBar/SearchBar.js'
import Dropdown from '../Dropdown/Dropdown';

const TopNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState("All");
    const  handleChange = (event) => setDropdownOpen(event.target.value);
    const options = ["All","Instagram", "Twitter", "Youtube", "Tiktok"]

    return (
        <div className="TopNav">
            <SearchBar />
            <Dropdown options={options} optionNames={options} dropdownOpen={dropdownOpen} handleChange={handleChange} />
            <button className="signout" >Sign Out</button>
        </div>
    )
}

export default TopNav