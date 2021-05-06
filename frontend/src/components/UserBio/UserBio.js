import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
// import {userContext} from '../userContext';
import './UserBio.css';

const UserBio = ({name, img, bio, followers}) => {

    return(
        <div className="UserBio">
            <div className="picture">
                <img src={img}></img>
            </div>
            <div className="nameBio">
                <div className="name">
                    {name}
                </div>
                <div className="bio">
                    Hello I am a huge fan of Klout! Love this App!
                </div>
                {/* <div className="followStat">
                    <div className="followers">
                        Followers 
                    </div>
                    <div className="following">
                        Following
                    </div>
                    <div className="numFollowers">
                        1.2k
                    </div>
                    <div className="numFollowing">
                        25
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default UserBio ;