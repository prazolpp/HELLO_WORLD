import React, { useEffect, useState } from 'react';
import './Dropdown.css'

const Dropdown = ({options, optionNames, dropdownOpen, handleChange }) => {
    
    const [optionsState, setOptionsState] =  useState(options)

    const renderdropdown = () => {
        let opt = options.map((option,i) => {
            return <option value={option}>{optionNames[i]}</option>
        })

        return opt
    }

    options = renderdropdown()

    return (
        <div className="Dropdown">
            <select value={dropdownOpen} onChange={handleChange}>
                {options}
            </select>
        </div>
    )
}

export default Dropdown;