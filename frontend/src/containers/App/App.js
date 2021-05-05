import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnalyticsPage from '../../components/AnalyticsPage/AnalyticsPage';
import LandingPage from '../../components/LandingPage/LandingPage';
import SearchPage from '../../components/SearchPage/SearchPage';
import Navbar from '../../components/Navbar/Navbar';
import './App.css';
import ProfilePage from '../../components/ProfilePage/ProfilePage'
import {userContext} from '../../userContext';

const App = () => {
    // useEffect(() => {
    //     if(getUser(userContext.value.uid)){
    //         console.log("already signed up")
    //     }
    //     else{
    //         insertNewUser(userContext.value.uid)
    //         console.log("added new user")
    //     }
    // },userContext)
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="appContent">
                    <Route path="/landingpage" component={LandingPage} />
                    <Route path="/analytics" render={() => <AnalyticsPage />} />
                    <Route path="/profile" render={() => <ProfilePage />}/>  
                    <Route path="/searchpage" render={SearchPage} />
                    {/* <Route path="/googleSSO" render={GoogleSSO} /> */}
                </div>
            </div>
        </Router>
    );
}

export default App;




// import React, { Component } from 'react';
// import Template2 from 'template2';
// import './App.css';

// class App extends Component {
  
  
//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }
  
//   callApi = async () => {
//     const response = await fetch('/api/hello');
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
    
//     return body;
//   };
  
//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();
    
//     this.setState({ responseToPost: body });
//   };

  
// render() {
//     return (
//       <div className="App">
//         <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p> 
//         <Template2 />
//       </div>
//     );
//   }
// }

// export default App;