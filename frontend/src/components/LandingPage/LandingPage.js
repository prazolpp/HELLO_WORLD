
import './LandingPage.css';
import { signInWithGoogle } from "../../services/firebase";
import { googleSignOut } from "../../services/firebase";

import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData, getYoutubeData, getInstagramData} from '../../apis/apis';

import ChartComponent from '../ChartComponent/ChartComponent'
import UserBio from '../UserBio/UserBio'
import TopNav from '../TopNav/TopNav';
import StatCards from '../StatCards/StatCards';
import {userContext} from '../../userContext';
import GoogleSSO from '../GoogleSSO/GoogleSSO'

const reload = () => {
    LandingPage();
}

var el = document.getElementById('button'); 

if(el){
    el.addEventListener('click',
    function(){
        document.querySelector('.bg-modal').style.display = 'flex';
    });
}

// document.querySelector('.close').addEventListener('click', 
// function(){
//     document.querySelector('.bg-modal').style.display = 'none'
// });

const LandingPage = ({}) => {

    const getStarted = () => {
    
    };

    //use Effect to make api call to gather image and tweet info
    // trickle down the datas from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        image : '',
        bio: '',
        data: {}, 
        userContext: userContext
    });

    const googleSignOut = () => {
        userContext.value = undefined
        window.location.reload(true)// reload();
      }

    if(userContext.value == undefined){
        return (
            <div className="LandingPage">
                <div className="welcomeKlout">
                    <img src="ruby.png" alt="ruby" width="140" height="100" />
                    <h1>Welcome to Klout</h1>
                    <p>Your personal social media manager</p>
                </div>
    
    
                <div className="line">
                    <h2>Track your social engagement with ease!</h2>
                    <h3>Choose one of the social media buttons now!</h3>
                </div>
    
                <div className="logos">
                    <ul>
                        <ol>
                            <img src="insta_last.png" alt="instagram" width="90" height="90"/>
                        </ol>
    
                        <ol>
                            <img src="twitter.png" alt="twitter" width="90" height="90"/>
                        </ol>
    
                        <ol>
                            <img src="tiktok.png" alt="tiktok" width="90" height="90"/>
                        </ol>
    
                        <ol>
                            <img src="app-icons-youtube.png" alt="youtube" width="90" height="90"/>
                        </ol>
    
                    </ul>
                </div>
    
    
                <div className="sign">
                    <p>---------------------Sign in with ---------------------</p>
                    <button type="button"><img src="google.jpeg" alt="google" width="40" height="20" onClick={signInWithGoogle}/></button>
                </div>
            </div>
        );
    } else {

        //
        // Portion executed when signed in
        //

        return (
            <div className="LandingPage">
                <div className="welcomeKlout">
                    <img src="ruby.png" alt="ruby" width="140" height="100" />
                    <h1>Welcome to Klout</h1>
                    <p>Your personal social media manager</p>
                </div>
    
    
                <div className="line">
                    <h2>Track your social engagement with ease!</h2>
                    <h3>Choose one of the social media buttons now!</h3>
                </div>
    
                <div className="logos">
                    <ul>
                        <li >
                            <a href="#" id="button" >
                                <img src="insta_last.png" alt="instagram" width="90" height="90"/>
                            </a>
                        </li>
    
                        <li>
                            <a href="#" id="button" >
                                <img src="twitter.png" alt="twitter" width="90" height="90"/>
                            </a>
                        </li>
    
                        <li >
                            <a href="#" id="button" >
                                <img src="tiktok.png" alt="tiktok" width="90" height="90"/>
                            </a>
                        </li>
    
                        <li >
                            <a href="#" id="button">
                                <img src="app-icons-youtube.png" alt="youtube" width="90" height="90"/>
                            </a>
                        </li>
    
                    </ul>
                </div>
    
                <div className="bg-modal">
                    <div className="modal-content">
                        <div class="close">+</div>
                        <img src="insta_last.png" alt="tiktok" width="90" height="90">
                        </img>
                        <form action="">
                            <input type="text" placeholder="social account"></input>
                            <a href="" class="button">Submit</a>
                        </form>
                    </div>
                </div>
                
            </div>

            
        );
    }

    
};

export default LandingPage;
