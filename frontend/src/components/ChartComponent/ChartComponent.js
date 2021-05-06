import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import './ChartComponent.css';
import LineCharts from '../LineCharts/LineCharts';
import Dropdown from '../Dropdown/Dropdown'


const ChartComponent = (props) => {
    
    const [dropdownOpen, setDropdownOpen] = useState("All");
    const  handleChange = (event) => setDropdownOpen(event.target.value);
    const options = ["week", "months", "years"]
    
    return (
        <div className="ChartComponent">
            <div className="Header">
                <Dropdown options={options} optionNames={options} dropdownOpen={dropdownOpen} handleChange={handleChange}/>
            </div>
            <LineCharts timePeriod={dropdownOpen} twitterName="" instaName="" youtubeName=""/>
        </div>
    )
}

export default ChartComponent ;