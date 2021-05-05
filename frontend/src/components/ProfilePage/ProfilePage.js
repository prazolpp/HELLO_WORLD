import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData } from '../../apis/apis';
import './ProfilePage.css';
import UserBio from '../UserBio/UserBio'
import UserStats from '../UserStats/UserStats'
import HorizontalNav from '../HorizontalNav/HorizontalNav'
import {userContext} from '../../userContext';
import GoogleSSO from '../GoogleSSO/GoogleSSO'

const ProfilePage = ({username}) => {

    //use Effect to make api call to gather image and tweet info
    // trickle down the data from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        image : '',
        bio: '',
        data: {}, 
        userContext: userContext
    });

    if(userContext.value !== undefined){
        return (
            <div className="Profile">
                <div className="coverpic">
                    <img src="https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500" ></img>
                </div>
                <UserBio name={userContext.value.displayName} img={userContext.value.photoURL}/>
                <HorizontalNav name={userContext.value.displayName} img={userContext.value.photoURL}/>
                <UserStats />
                {/*
                    <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                    <UserData data={usersInfoState.data} />
                */}
            </div>
        );
   }else {
        console.log(userContext.value)
       return(<GoogleSSO />);
   }
};


export default ProfilePage ;