import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import './UserBio.css';

const UserBio = ({name, img, bio, followers}) => {

    return(
        <div className="UserBio">
            <div className="picture">
                <img src="https://pbs.twimg.com/profile_images/1365346288657715201/lRfQRoWl_400x400.jpg"></img>
            </div>
            <div className="name">
                {name}
            </div>
            <div className="bio">
                Hello I am a huge fan of Klout! Love this App!
            </div>
            <div className="followers">
                Number of followers: {followers}
            </div>
        </div>
    )



}

export default UserBio ;