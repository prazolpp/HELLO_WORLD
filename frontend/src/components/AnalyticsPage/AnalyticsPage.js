import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData, getYoutubeData } from '../../apis/apis';
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
        data: {
            youtube:{}
        }
    });
 
    
    const medias = ["followers", "posts", "views"]
    username = "PewDiePie"
    let statcards = ""
    useEffect(() => {
        {/*
        // todo: replace username with each usernames of each media
        let twitterRequestObj = {
            url: `${getTwitterData}/${username}`,
        }

        //todo: change the values in the usersInfoState to match the twitter api
        sendRequest(twitterRequestObj).then((usersInfo) => {
            {console.log(usersInfo)}
            setUsersInfoState({
                data: {
                    ...usersInfoState.data,
                    followers: usersInfo[0].formatted_followers_count
                }
            });
        });
    */}
        let youtubeRequestObj = {
            url: `${getYoutubeData}/${username}`
        }

        sendRequest(youtubeRequestObj).then((usersInfo) => {
            setUsersInfoState({
                data: { 
                    ...usersInfoState.data, 
                    youtube:{
                        followers: usersInfo.items[0].statistics.subscriberCount,
                        posts: usersInfo.items[0].statistics.videoCount,
                        views: usersInfo.items[0].statistics.viewCount
                    }
                }
            })
        })

        
    }, [username]);

    console.log(usersInfoState)
    statcards = medias.map((media,i) => {
        return <StatCard media={"Youtube " + media} number={usersInfoState.data.youtube[media]} pastNumber={usersInfoState.data.youtube[media]} />
    })

    return (
        <div className="Analytics">
            <TopNav />
            <UserBio name={username} img={"https://yt3.ggpht.com/ytc/AAUvwnga3eXKkQgGU-3j1_jccZ0K9m6MbjepV0ksd7eBEw=s176-c-k-c0x00ffffff-no-rj"} followers={55}/>
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