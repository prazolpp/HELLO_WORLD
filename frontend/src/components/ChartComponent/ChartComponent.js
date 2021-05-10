import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import './ChartComponent.css';
import LineCharts from '../LineCharts/LineCharts';
import Dropdown from '../Dropdown/Dropdown'


const ChartComponent = ({dataObj}) => {
    
    const [dropdownOpen, setDropdownOpen] = useState("All");
    const  handleChange = (event) => {
        setDropdownOpen(event.target.value);
    }
    
    return (
        <div className="ChartComponent">
            <LineCharts dataObj={dataObj} timePeriod={dropdownOpen} twitterName="" instaName="" youtubeName=""/>
        </div>
    )
}

export default ChartComponent ;