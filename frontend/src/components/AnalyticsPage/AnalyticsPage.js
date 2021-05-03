import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData, getYoutubeData, getInstagramData } from '../../apis/apis';
import './AnalyticsPage.css';
import ChartComponent from '../ChartComponent/ChartComponent'
import UserBio from '../UserBio/UserBio'
import TopNav from '../TopNav/TopNav';
import StatCards from '../StatCards/StatCards';

const AnalyticsPage = ({username}) => {

    //use Effect to make api call to gather image and tweet info
    // trickle down the data from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        username: username,
        youtubeName: "",
        twitterName: "",
        image : '',
        bio: '',
        data: {
            youtube:{},
            instagram:{},
            twitter:{},
            tiktok:{}
        }
    })
    const [platform, setPlatform] = useState("Twitter")
    const  handleChange = (event) => setPlatform(event.target.value);

    // const medias = {
    //     youtube: ["followers", "posts", "views"],
    //     instagram: ["followers", "posts", "following"],
    //     tiktok: []
    // }
    const setYoutubeName = (e) => {
        if(e.key == "Enter"){
            setUsersInfoState({
                ...usersInfoState,
                youtubeName: e.target.value
            })
        }
    }
    const setTwitterName = (e) => {
        if(e.key == "Enter"){
            setUsersInfoState({
                ...usersInfoState,
                twitterName: e.target.value
            })
        }
    }

    useEffect(() => {

        let youtubeRequestObj = {
            url: `${getYoutubeData}/${usersInfoState.youtubeName}`
        }

        sendRequest(youtubeRequestObj).then((usersInfo) => {
            setUsersInfoState({
                ...usersInfoState,
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
        let twitterRequestObj = {
            url: `${getTwitterData}/${usersInfoState.twitterName}`
        }

        sendRequest(twitterRequestObj).then((usersInfo) => {
            setUsersInfoState({
                ...usersInfoState,
                data: { 
                    ...usersInfoState.data, 
                    twitter:{
                        followers: usersInfo.followers_count,
                        posts: usersInfo.statuses_count,
                        following: usersInfo.friends_count
                    }
                }
            })
        })
    }, [usersInfoState.twitterName, platform, usersInfoState.youtubeName]);

    console.log(usersInfoState)

    return (
        <div className="Analytics">
            <TopNav platform={platform} handleChange={handleChange}/>
            <UserBio name={username} img={"https://yt3.ggpht.com/ytc/AAUvwnga3eXKkQgGU-3j1_jccZ0K9m6MbjepV0ksd7eBEw=s176-c-k-c0x00ffffff-no-rj"} followers={55}/>
            <StatCards platform={platform} setTwitterName={setTwitterName} setYoutubeName={setYoutubeName} usersInfoState={usersInfoState}/>
            <ChartComponent />
            {/*
                <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                <UserData data={usersInfoState.data} />
            */}

        </div>
    );
};

export default AnalyticsPage ;