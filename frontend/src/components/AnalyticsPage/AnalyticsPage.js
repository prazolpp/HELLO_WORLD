import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData, getYoutubeData, getInstagramData} from '../../apis/apis';
import './AnalyticsPage.css';
import ChartComponent from '../ChartComponent/ChartComponent'
import UserBio from '../UserBio/UserBio'
import TopNav from '../TopNav/TopNav';
import StatCards from '../StatCards/StatCards';
import {userContext} from '../../userContext';
import GoogleSSO from '../GoogleSSO/GoogleSSO'

const AnalyticsPage = ({}) => {

    //use Effect to make api call to gather image and tweet info
    // trickle down the data from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        userid: "",
        youtubeName: "",
        twitterName: "",
        instagramName: "",
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
    const setInstagramName = (e) => {
        if(e.key == "Enter"){
            setUsersInfoState({
                ...usersInfoState,
                instagramName: e.target.value
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
        let instaRequestObj = {
            url: `${getInstagramData}/${usersInfoState.instagramName}`
        }
        sendRequest(instaRequestObj).then((usersInfo) => {
            setUsersInfoState({
                ...usersInfoState,
                data: { 
                    ...usersInfoState.data, 
                    instagram:{
                        followers: usersInfo.graphql.user.edge_followed_by.count || 0,
                        posts: 0,
                        following: usersInfo.graphql.user.edge_follow.count|| 0
                    }
                }
            })
        }).catch((error) => console.log)

    }, [usersInfoState.twitterName, usersInfoState.youtubeName, platform, userContext]);

    console.log(usersInfoState)

     if(userContext.value == undefined){
         console.log(userContext.value)
         return(<GoogleSSO />);
    }else {
        return (
            <div className="Analytics">
                <TopNav platform={platform} handleChange={handleChange}/>
                <UserBio name={userContext.value.displayName} img={userContext.value.photoURL} />
                <div class="prompt">
                    Choose a platform from the top right corner and enter your social media id below! 
                </div>
                <StatCards platform={platform} setTwitterName={setTwitterName} setYoutubeName={setYoutubeName} setInstagramName={setInstagramName} usersInfoState={usersInfoState}/>
                <ChartComponent />
                {/*
                    <UserInfo username={usersInfoState.username} image={usersInfoState.image} bio={usersInfoState.bio}/>
                    <UserData data={usersInfoState.data} />
                */}

            </div>
        );
    }
};

export default AnalyticsPage ;