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
        alert("shared the card!!")
        console.log(data, `shared card to ${email}`)
    }).then((error) => console.log(error, `error sharing card to ${email}`))
    
    return 
}
