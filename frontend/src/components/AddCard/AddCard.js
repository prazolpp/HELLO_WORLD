import React, { useState } from 'react';
import { addCard } from '../../apis/apis';
import { sendRequest } from '../../sendRequest/sendRequest';
import {userContext} from '../../userContext';

const AddCard = () => {

    const [userData, setUserData] = useState({
        field1name: "",
        field1val: "",
        field2name: "",
        field2val: "",
        field3name: "",
        field3val: "",
    })
    


    let cardname = Math.random(Number.MAX_SIZE)
    const requestObj = {
        url: `${addCard}/${userContext.value.uid}/${cardname}`,
        method: 'POST'
    };

    const onSubmit = (e) => {
        e.preventDefault()
        let card = {
            [userData.field1name] : userData.field1val,
            [userData.field2name] : userData.field2val,
            [userData.field3name] : userData.field3val
        }
        requestObj.body = JSON.stringify(card)
        console.log(requestObj)
        sendRequest(requestObj).then((data) => {
            alert("Your Kard has been added!!")
            console.log(data)
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((userData) => ({
            ...userData, 
            [name]: value,
        }));
    };


    return (
        <form onSubmit={onSubmit}>
        <label>
            First social media and your account name
            <input type="text" name="field1name" onChange={handleInputChange}/>
            <input type="text" name="field1val" onChange={handleInputChange}/>
        </label><br /><br /><br />

        <label>
            Second social media and your account name
            <input type="text" name="field2name" onChange={handleInputChange}/>
            <input type="text" name="field2val" onChange={handleInputChange}/>
        </label><br /><br /><br />
        <label>
            Third social media and your account name
            <input type="text" name="field3name" onChange={handleInputChange}/>
            <input type="text" name="field3val" onChange={handleInputChange}/>
        </label><br /><br /><br />
        <input type="submit" value="Submit"/>
        </form>
    )
}
export default AddCard