import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import './ChartComponent.css';
import LineCharts from '../LineCharts/LineCharts'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ChartComponent = (props) => {
    
    const [dropdownOpen, setDropdownOpen] = useState("All");
    const  handleChange = (event) => setDropdownOpen(event.target.value);

    return (
        <div className="ChartComponent">
            <div className="chartSwitcher">
                <div className="setMedia">
                    <select value={dropdownOpen} onChange={handleChange}>
                        <option value="last_week">Last week</option>
                        <option value="last_month">Last month</option>
                        <option value="last_6_months">Last 6 months</option>
                        <option value="last_year">Last year</option>
                    </select>
                </div>
            </div>
            <LineCharts timePeriod={dropdownOpen} twitterName="" instaName="" youtubeName=""/>
        </div>
    )
}

export default ChartComponent ;