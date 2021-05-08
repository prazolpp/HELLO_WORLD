import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import './ChartComponent.css';
import LineCharts from '../LineCharts/LineCharts';
import Dropdown from '../Dropdown/Dropdown'


const ChartComponent = (props) => {
    
    const [dropdownOpen, setDropdownOpen] = useState("All");
    const  handleChange = (event) => {
        setDropdownOpen(event.target.value);
    }
    
    return (
        <div className="ChartComponent">
            <LineCharts timePeriod={dropdownOpen} twitterName="" instaName="" youtubeName=""/>
        </div>
    )
}

export default ChartComponent ;