import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import { sendRequest } from '../sendRequest/sendRequest';
import {userContext} from '../userContext';
import {addEmail} from '../apis/apis'

dotenv.config()
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
    userContext.value=res.user
    let urlObj = {
      //http://localhost:5000/db/user/insert/:id/:email
      url: `${addEmail}/${userContext.value.uid}/${userContext.value.email}`,
      method: 'POST'
    }

  sendRequest(urlObj).then((data)=>console.log(data)).catch((err) => console.log(err))
    return true
  }).catch((error) => {
    console.log(error.message)
    return false
  })
}

export const googleSignOut = () => {
  userContext.value = undefined
}