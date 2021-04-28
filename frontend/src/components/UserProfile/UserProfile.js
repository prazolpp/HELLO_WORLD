import React, { useEffect, useState } from 'react';
import { HorizontalNav} from '../HorizontalNav/HorizontalNav';
import { sendRequest } from '../../sendRequest/sendRequest';
import { BrowserRouter as Router, Route, Switch , useLocation } from 'react-router-dom';
import {Status} from '../Status/Status';
import {userContext} from '../userContext';
import './UserProfile.css';

const UserProfile= (props) => {

    return (
        <Router>
            <div className="UserProfile">
                <HorizontalNav />
                <div className="profileContent">
                    <Route path= "/profile/status"component={Status}/>
                    <Route path="/profile/mystats"/>
                    <Route path="/profile/businesscard"/>  
                    <Route path="/profile/share" />
                </div>
            </div>
        </Router>
    )
}

export default UserProfile ;