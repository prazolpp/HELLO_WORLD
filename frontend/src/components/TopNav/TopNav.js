import React from 'react';
import './TopNav.css';
import Dropdown from '../Dropdown/Dropdown';

const TopNav = ({platform, handleChange}) => {
    const options = ["Twitter", "Youtube"]

    return (
        <div className="TopNav">
            <Dropdown options={options} optionNames={options} dropdownOpen={platform} handleChange={handleChange} />
        </div>
    )
}

export default TopNav