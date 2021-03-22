import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../shared/sendRequest';
import { getTwitterData } from '../../apis/apis';
import './AnalyticsPage.css';


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
                username: usersInfo[0].screen_name,
                image : "",
                bio: "",
                data: {
                    followers: usersInfo[0].followers_count
                }
            });
        });
        
    }, [username]);
        
    return (
        <div className="Analytics">
            {usersInfoState.username}
            {usersInfoState.data.followers}
            {/*
                <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                <UserData data={usersInfoState.data} />
            */}
        </div>
    );
};

export default AnalyticsPage ;