import React, {useState } from 'react';
import './ProfilePage.css';
import UserBio from '../UserBio/UserBio'
import Kards from '../Kards/Kards'
import { Link } from 'react-router-dom';
import {userContext} from '../../userContext';
import { signInWithGoogle } from "../../services/firebase";
// import { googleSignOut } from "../../services/firebase";

// const ProfilePage = ({username}) => {

const ProfilePage = (props) => {

    //use Effect to make api call to gather image and tweet info
    // trickle down the datas from this component to child components to display in each of them 
    const [usersInfoState, setUsersInfoState] = useState({
        image : '',
        bio: '',
        data: {}, 
        userContext: userContext,
    });

    const {
        tabNum: [tabNum, setTabNum]
      } = {
        tabNum: useState(0),
        ...(props.state || {})
      };

      const onClick = (event) => {
        setTabNum(0);
        signInWithGoogle();
        // window.history.back()
    }


    const googleSignOut = () => {
        userContext.value = undefined;
        setTabNum(0);
        // window.location.reload(true)// reload();
        // history.push("../LandingPage/LandingPage");
        // window.location = '../LandingPage/LandingPage' //.go(0);
      }

    if(userContext.value !== undefined){
        return (
            <div className="Profile">
                <div className="coverpic">
                    <img src="https://pbs.twimg.com/profile_banners/44196397/1576183471/1500x500" ></img>
                </div>
                <UserBio name={userContext.value.displayName} img={userContext.value.photoURL}/>
                <Kards name={userContext.value.displayName} img={userContext.value.photoURL}/>

                <Link to='/landingpage' onClick={googleSignOut} class="button-signout">Sign Out</Link>
                {/* <button class="button" type="button" onClick={googleSignOut}>Sign Out</button> */}

            </div>
            
        );
   }else {
    return (
        <div className="GoogleSSO">


            <div className="line">
                <h2>Sign in to manage your kards and view your social analytics!</h2>
            </div>




            <div className="sign">
                <p>---------------------Sign in with ---------------------</p>
                {/* <button type="button"><img src="google.jpeg" alt="google" width="40" height="20" onClick={onClick}/></button> */}
                <Link to='/landingpage'><img src="google.jpeg" alt="google" width="40" height="20" onClick={onClick}/></Link>
                
            </div>
        </div>
    );

    //     console.log(userContext.value)
    //    return(<GoogleSSO />);
   }
};


export default ProfilePage ;