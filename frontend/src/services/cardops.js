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
