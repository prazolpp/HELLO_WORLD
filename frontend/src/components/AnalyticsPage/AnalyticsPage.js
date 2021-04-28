import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getTwitterData, getYoutubeData, getInstagramData } from '../../apis/apis';
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
            youtube:{},
            instagram:{},
            twitter:{
                followers: '466.9k',
                following: 0,
                posts:0
            },
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
    username = "PewDiePie"
    const setUsername = (username) => {
        setUsersInfoState({
            ...usersInfoState,
            username: username
        })
    }
    let statcards = ""
    let statcards_twitter = ""
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
            url: `${getYoutubeData}/${"PewDiePie"}`
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
        // let twitterRequestObj = {
        //     url: `${getTwitterData}/${"pewdiepie"}`
        // }

        // sendRequest(twitterRequestObj).then((usersInfo) => {
        //     setUsersInfoState({
        //         data: { 
        //             ...usersInfoState.data, 
        //             twitter:{
        //                 followers: usersInfo.followers_count,
        //                 posts: usersInfo.statuses_count,
        //                 following: usersInfo.friends_count
        //             }
        //         }
        //     })
        // })

    }, [usersInfoState.username, platform]);

    console.log(usersInfoState)
    const medias = ["followers", "posts", "views"]
    if(platform == "Youtube"){
        statcards = medias.map((media,i) => {
            return <StatCard media={`${platform} ${media}`} number={usersInfoState.data.youtube[media]} pastNumber={usersInfoState.data.youtube[media]} />
        })
    }

    const twitter = ["followers", "posts", "following"]
    if(platform == "Twitter"){
        statcards_twitter = twitter.map((media,i) => {
            return <StatCard media={`${platform} ${media}`} number={usersInfoState.data.twitter[media]} pastNumber={usersInfoState.data.twitter[media]} />
        })
    }
    return (
        <div className="Analytics">
            <TopNav username={username} setUsername={setUsername} platform={platform} handleChange={handleChange}/>
            <UserBio name={username} img={"https://yt3.ggpht.com/ytc/AAUvwnga3eXKkQgGU-3j1_jccZ0K9m6MbjepV0ksd7eBEw=s176-c-k-c0x00ffffff-no-rj"} followers={55}/>
            <div className="statCards">
                {statcards }
                {statcards_twitter }
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