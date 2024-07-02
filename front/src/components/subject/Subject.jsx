import React, { useContext, useEffect, useState } from 'react'
import SubjectCss from '../subject/subjext.module.css'
import { useNavigate } from 'react-router-dom'
import Header from './../header/Header';
import axios from 'axios'
import { useTranslation } from 'react-i18next';

export default function Subject() {
    const { t} = useTranslation();

    const navigate = useNavigate();
    const [Subject, setSubject] = useState(null);


    async function getSubjects() {
        try {

            const { data } = await axios.get('http://localhost:8080/subject/subjects',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            setSubject(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSubjects();


    }, [])

    function NavToUnit(subId, subName, teacherId , subPhoto) {
        localStorage.setItem('subId', subId);
        localStorage.setItem('subName', subName);
        localStorage.setItem('subPhoto', subPhoto);
        getTeacherName(teacherId);
        setTimeout(function () {
            navigate('/units')
        }, 100);
    }

    async function getTeacherName(teacherId) {



        try {

            const { data } = await axios.get('http://localhost:8080/teacher/teachers',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            const selectTeacher = data.filter(data => data.id === teacherId);
            localStorage.setItem('teacherName', selectTeacher[0].name);
        } catch (error) {
            console.log(error);
        }
    }










    return <>
        <Header />
        {Subject === null ? <>
            <div className='mt-5'>.</div>
            <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

            </div>
        </> : <>
            <div className='mt-5'>.</div>
            <div className=" container mt-4 mb-4 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
                <div className={SubjectCss}>
                    <div className='text-center overflow-auto' >


                        <div className={SubjectCss.headerContainer}>
                            <h2 className={SubjectCss.customHeading +" pt-2"}>
                            {t("subs")}
                            </h2>
                        </div>


                        <div className={SubjectCss.boxcontainer + " p-3"}>

                            {Subject.map(function (sub, idx) {
                                return <div key={idx}>
                                    <div className='card rounded-4 pb-3'>
                                        <div className={SubjectCss.imageContainer + " p-5"}>
                                            <img src={sub.pictureURL} alt={sub.title} className='w-100 card-img-top rounded-4' />
                                        </div>
                                        <div className='card-body'>
                                            <h4 className='card-title'>{sub.title}</h4>
                                            <p className='card-text'>{sub.description}</p>
                                        </div>


                                        <div className='row justify-content-center m-1'>
                                            <div className='col-10'>
                                                <button onClick={() => { NavToUnit(sub.id, sub.title, sub.teacher , sub.pictureURL) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                                            </div>
                                        </div>

                                        <div className='row justify-content-center m-1'>
                                            <div className='col-10'>
                                                <a style={{ width: "100%" }} href={sub.contentOfFirstTerm} target="_blank" rel="Interactive content of first term">
                                                    <button className='btn btn-success w-100'>{t("firstTermBtn")}</button>
                                                </a>
                                            </div>
                                        </div>





                                        <div className='row justify-content-center m-1 '>
                                            <div className='col-10'>
                                                <a style={{ width: "100%" }} href={sub.contentOfSecondTeam} target="_blank" rel="Interactive content of Second term">
                                                    <button className='btn btn-success w-100'>{t("secondTermBtn")}</button>
                                                </a>
                                            </div>
                                        </div>



                                    </div>
                                </div>

                            })}

                        </div>




                    </div>

                </div>
            </div>
        </>}



    </>
}
