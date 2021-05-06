import React, { useState } from 'react';

const ShareButton = ({sendEmail}) => {

    const [shareState, setshareState] = useState(false);

    const share = (event) => {

        if(event.key == "Enter"){
            console.log("heree")
            sendEmail(event.target.value)
            setshareState(false)
        }
    }

    if(!shareState){
        return (<a className="share" onClick={()=> {setshareState(true)}}>Share</a>)
    }
    else{
        return (<input className="share" placeholder="Enter email" onKeyUp={share}></input>)
    }
    
}

export default ShareButton;