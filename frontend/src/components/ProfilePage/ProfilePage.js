import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData } from '../../apis/apis';
import './ProfilePage.css';
import UserBio from '../UserBio/UserBio'
import UserStats from '../UserStats/UserStats'
import HorizontalNav from '../HorizontalNav/HorizontalNav'

const ProfilePage = ({username}) => {

    //use Effect to make api call to gather image and tweet info
    // trickle down the data from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        username: username,
        image : '',
        bio: '',
        data: {}
    });

    useEffect(() => {
        let requestObj = {
            url: `${getTwitterData}/${username}`,
        }
        //todo: change the values in the usersInfoState to match the twitter api
        sendRequest(requestObj).then((usersInfo) => {
            {console.log(usersInfo)}
            setUsersInfoState({
                username: usersInfo[0].name,
                image : "",
                bio: "",
                data: {
                    followers: usersInfo[0].formatted_followers_count
                }
            });
        });
        
    }, [username]);
        
    return (
        <div className="Profile">
            <div className="coverpic">
                <img src="https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500" ></img>
            </div>
            <UserBio name={"John Brown"} img={"https://images.unsplash.com/photo-1524666041070-9d87656c25bb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"} followers={55}/>
            <HorizontalNav />
            <UserStats />
            {/*
                <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                <UserData data={usersInfoState.data} />
            */}
        </div>
    );
};

export default ProfilePage ;