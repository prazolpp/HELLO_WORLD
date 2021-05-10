import React, { useState } from 'react';
import './GoogleSSO.css';
import { signInWithGoogle } from "../../services/firebase";
import {userContext} from '../../userContext';
import { useHistory, Link } from "react-router-dom";
//Extra sign-in page in case the user needs to sign in from anywhere else in the app (can just link to this)

const GoogleSSO = (props) => {

    const {
        tabNum: [tabNum, setTabNum]
      } = {
        tabNum: useState(0),
        ...(props.state || {})
      };
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }
    const onClick = (event) => {
        setTabNum(0);
        signInWithGoogle();
        // window.history.back()
    }

    return (
        <div className="GoogleSSO">


            <div className="line">
                <h2>Sign in to manage your kards and view your social analytics!</h2>
            </div>




            <div className="sign">
                <p>---------------------Sign in with ---------------------</p>
                {/* <button type="button"><img src="google.jpeg" alt="google" width="40" height="20" onClick={onClick}/></button> */}
                <Link to='/landingpage'><img src="google.jpeg" alt="google" width="40" height="20" onClick={onClick}/></Link>
                
            </div>
        </div>
    );
};

export default GoogleSSO;