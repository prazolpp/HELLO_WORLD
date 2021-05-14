import React, { useState } from 'react';
import { addCard, addCardUser} from '../../apis/apis';
import { sendRequest } from '../../sendRequest/sendRequest';
import {userContext} from '../../userContext';
import {hashString} from '../../services/cardops'

const AddCard = ({username, img, cardAdder}) => {

    const [userData, setUserData] = useState({
        field1name: "",
        field1val: "",
        field2name: "",
        field2val: "",
        field3name: "",
        field3val: "",
    })
    
    let card =   {
        [userData.field1name]: userData.field1val,
        [userData.field2name]: userData.field2val,
        [userData.field3name]: userData.field3val,
        username: username,
        img: img
    }         

    const onSubmit = (e) => {
        e.preventDefault()
        let addCard = "http://localhost:5000/db/card/newCard"
        let cardname = hashString(userContext.value.uid+Math.random(Number.MAX_VALUE));
        let requestObj = {
            url: `${addCard}/${userContext.value.uid}/${cardname}`,
            method: 'POST',
            body: JSON.stringify({
                [userData.field1name]: userData.field1val,
                [userData.field2name]: userData.field2val,
                [userData.field3name]: userData.field3val,
                username: username,
                img: img
            })
        };

        sendRequest(requestObj).then((data) => console.log)
        alert("A new card has been added. Please go to personal cards to view it")
        cardAdder({[cardname]: card})
        // let card = 
        //     [userData.field1name] : userData.field1val,
        //     [userData.field2name] : userData.field2val,
        //     [userData.field3name] : userData.field3val
        // }

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((userData) => ({
            ...userData, 
            [name]: value,
        }));
    };


    return (
        <form className="addCard" onSubmit={onSubmit}>
        <label>
            Social Media &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Name
            <input type="text" name="field1name" onChange={handleInputChange}/>&nbsp;&nbsp;
            <input type="text" name="field1val" onChange={handleInputChange}/>
        </label><br /><br /><br />

        <label>
            Social Media &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Name
            <input type="text" name="field2name" onChange={handleInputChange}/>&nbsp;&nbsp;
            <input type="text" name="field2val" onChange={handleInputChange}/>
        </label><br /><br /><br />
        <label>
            Social Media &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Name
            <input type="text" name="field3name" onChange={handleInputChange}/>&nbsp;&nbsp;
            <input type="text" name="field3val" onChange={handleInputChange}/>
        </label><br /><br /><br />
        <input type="submit" value="Submit"/>
        </form>
    )
}
export default AddCard