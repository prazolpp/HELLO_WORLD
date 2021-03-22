import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData } from '../../apis/apis';
import './AnalyticsPage.css';
import UserBio from '../UserBio/UserBio'

const AnalyticsPage = ({username}) => {

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
        <div className="Analytics">
            <div className="coverpic">
                <img src="https://pbs.twimg.com/profile_banners/27260086/1616126665/1500x500" ></img>
            </div>
            <UserBio name={username} followers={usersInfoState.data.followers}/>
            {/*
                <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                <UserData data={usersInfoState.data} />
            */}
        </div>
    );
};

export default AnalyticsPage ;