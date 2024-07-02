import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserProfile from '../../userProfile/UserProfile';

export default function Profile() {

    const [teacher, setTeacher] = useState(null)

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

    async function getTeacherByEmail() {
        const formData = objectToFormData(email);
        try {

            const { data } = await axios.post('http://localhost:8080/user/getUserByEmail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setTeacher(data);

        } catch (error) {
            console.log("catch error: ", error);
        }
    }

    useEffect(() => {
        getTeacherByEmail();


    }, [])

    return (
        <>
            {teacher === null ? "" :
                <UserProfile
                    name={teacher.name}
                    personalPhoto={teacher.personalPhoto}
                    email={teacher.email}

                />}
        </>
    )
}
