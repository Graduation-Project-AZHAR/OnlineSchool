import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserProfile from '../../userProfile/UserProfile';

export default function Profile() {

    const [parent, setParent] = useState(null)

    const objectToFormData = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return formData;
    };

    let email = {
        email: localStorage.getItem('userEmail')
    }

    async function getParentByEmail() {
        const formData = objectToFormData(email);
        try {

            const { data } = await axios.post('http://localhost:8080/user/getUserByEmail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setParent(data);

        } catch (error) {
            console.log("catch error: ", error);
        }
    }

    useEffect(() => {
        getParentByEmail();


    }, [])

    return (
        <>
            {parent === null ? "" :
                <UserProfile
                    name={parent.name}
                    personalPhoto={parent.personalPhoto}
                    email={parent.email}

                />}
        </>
    )
}
