import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import {userContext} from '../userContext';
import {addCardUser} from '../apis/apis'
import {sendRequest} from '../sendRequest/sendRequest'

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
    let reqObj = {
      url: `${addCardUser}/${userContext.value.uid}`,
      method: 'POST'
    }
    sendRequest(reqObj, (req, res) => {
      console.log(res)
    })
    return true
  }).catch((error) => {
    console.log(error.message)
    return false
  })
}