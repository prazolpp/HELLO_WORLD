import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AnalyticsPage from '../../components/AnalyticsPage/AnalyticsPage';
import LandingPage from '../../components/LandingPage/LandingPage';
import Navbar from '../../components/Navbar/Navbar';
import './App.css';
import ProfilePage from '../../components/ProfilePage/ProfilePage'

const App = () => {
    const [tabNum, setTabNum] = useState(0)

    // useEffect(() => {
    //     if(getUser(userContext.value.uid)){
    //         console.log("already signed up")
    //     }
    //     else{
    //         insertNewUser(userContext.value.uid)
    //         console.log("added new user")
    //     }
    // },userContext)

    // userContext.value = {uid: "203423948239428"}
    // userContext.value.displayName = "Prajwal Pyakurel"
    // userContext.value.photoURL = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    return (
        <Router>
            <div className="App">
                {/* <Navbar /> */}
                <Navbar state={{ tabNum: [tabNum, setTabNum] }} />
                <div className="appContent">
                    <Route path="/landingpage" component={LandingPage} />
                    <Route path="/analytics" render={() => <AnalyticsPage state={{ tabNum: [tabNum, setTabNum] }}/>} />
                    <Route path="/profile" render={() => <ProfilePage state={{ tabNum: [tabNum, setTabNum] }}/>}/>  
                    {/* <Route path="/googleSSO" render={GoogleSSO} /> */}
                </div>
            </div>
        </Router>
    );
}

export default App;