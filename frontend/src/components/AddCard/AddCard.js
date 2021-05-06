import React, { useState } from 'react';
import { addCard, addCardUser} from '../../apis/apis';
import { sendRequest } from '../../sendRequest/sendRequest';
import {userContext} from '../../userContext';

const AddCard = ({addCard}) => {

    const [userData, setUserData] = useState({
        field1name: "",
        field1val: "",
        field2name: "",
        field2val: "",
        field3name: "",
        field3val: "",
    })
    


    let cardname = Math.random(Number.MAX_SIZE)

    const onSubmit = (e) => {
        e.preventDefault()
        let card = [
            {
             name: userData.field1name,
             username:  userData.field1val
            },
            {
                name: userData.field2name,
                username:  userData.field2val
               
            },
            {
                name: userData.field3name,
                username:  userData.field3val
            },
        ]

        let requestObj = {
            url: `${addCard}/${userContext.value.uid}/${cardname}`,
            method: 'POST',
            body: JSON.stringify(card)
        };

        alert("A new card has been added. Please go to personal cards to view it")
        addCard(card)
        // let card = {
        //     [userData.field1name] : userData.field1val,
        //     [userData.field2name] : userData.field2val,
        //     [userData.field3name] : userData.field3val
        // }

        let reqObj = {
            url: `${addCardUser}/${userContext.value.uid}`,
            method: 'POST'
        }

        sendRequest(reqObj).then((data) => {
            console.log(data)
            return data
        }).then((d) => {
            sendRequest(requestObj).then((data) => {
                alert("Your Kard has been added!!")
                console.log(data)
            });
        })

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((userData) => ({
            ...userData, 
            [name]: value,
        }));
    };


    return (
        <form class="addCard" onSubmit={onSubmit}>
        <label>
            Social Media &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Name
            <input type="text" name="field1name" onChange={handleInputChange}/>
            <input type="text" name="field1val" onChange={handleInputChange}/>
        </label><br /><br /><br />

        <label>
            Social Media &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Name
            <input type="text" name="field2name" onChange={handleInputChange}/>
            <input type="text" name="field2val" onChange={handleInputChange}/>
        </label><br /><br /><br />
        <label>
            Social Media &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Account Name
            <input type="text" name="field3name" onChange={handleInputChange}/>
            <input type="text" name="field3val" onChange={handleInputChange}/>
        </label><br /><br /><br />
        <input type="submit" value="Submit"/>
        </form>
    )
}
export default AddCard