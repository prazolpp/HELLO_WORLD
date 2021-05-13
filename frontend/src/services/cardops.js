import { sendRequest } from "../sendRequest/sendRequest"
import {shareCard} from '../apis/apis'


export const sendEmail = (id, cardID, email) => {
    //add functionality

    // http://localhost:5000/db/card/shareCard/:id/:cardID/:email
    let urlObj = {
        url: `${shareCard}/${id}/${cardID}/${email}`,
        method: 'POST'
    }
    sendRequest(urlObj).then((data) => {
        if(data == "success"){
            alert("shared the card!!")
        }
        else{
            alert("Error sharing card")
        }
    }).catch((error) => console.log)
    
    return 
}

// database operations
export const hashString = (string) => {               
    var hash = 0; 
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
  }