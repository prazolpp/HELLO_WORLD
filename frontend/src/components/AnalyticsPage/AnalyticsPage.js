import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData } from '../../apis/apis';
import './AnalyticsPage.css';
import ChartComponent from '../ChartComponent/ChartComponent'
import UserBio from '../UserBio/UserBio'
import TopNav from '../TopNav/TopNav';
import StatCard from '../StatCard/StatCard';

const AnalyticsPage = ({username}) => {

    //use Effect to make api call to gather image and tweet info
    // trickle down the data from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        username: username,
        image : '',
        bio: '',
        data: {}
    });
 
    
    const medias = ["Twitter Followers", "Youtube Subscribers", "Tiktok Followers"]
    const numbers = [{curr: 1000, past: 900}, {curr: 1200, past: 1083}, {curr: 2200, past: 1329}]

    const statcards = medias.map((media,i) => {
        return <StatCard media={media} number={numbers[i].curr} pastNumber={numbers[i].past}/>
    })

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
            <TopNav />
            <UserBio name={"John Brown"} img={"https://images.unsplash.com/photo-1524666041070-9d87656c25bb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"} followers={55}/>
            <div className="statCards">
                {statcards}
            </div>
            <ChartComponent />
            {/*
                <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                <UserData data={usersInfoState.data} />
            */}
        </div>
    );
};

export default AnalyticsPage ;