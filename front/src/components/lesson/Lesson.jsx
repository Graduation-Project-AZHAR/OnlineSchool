import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import LessonCss from '../lesson/Lesson.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Lesson() {

    const navigate = useNavigate();
    const { t} = useTranslation();

    const [lesson, setLesson] = useState(null);
    const [student, setStudent] = useState(null);
    const [lessonFlages, setLessonFlages] = useState(null);

    async function getLessons() {
        try {

            const { data } = await axios.get('http://localhost:8080/lesson/uniteLessons/' + localStorage.getItem('subId') + "/" + localStorage.getItem('unitNumber'), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setLesson(data);


        } catch (error) {
            console.log(error);
        }
    }

    function lessonCheckPath() {
        if (localStorage.getItem("subId") === null || localStorage.getItem("subName") === null || localStorage.getItem("unitNumber") === null || localStorage.getItem("unitName") === null) {
            setTimeout(function () {
                navigate('/subject')
            }, 0);
        }
    }

    useEffect(() => {
        getStudentByEmail();
        lessonCheckPath();
        getLessons();

    }, [])

    useEffect(() => {
        if (student)
            getLessonlages(student.id);

    }, [student])

    function NavTolessonExplanation(lessonNumber, lessonName) {
        localStorage.setItem('lessonNumber', lessonNumber);
        localStorage.setItem('lessonName', lessonName);
        setTimeout(function () {
            navigate('/lessonExplanation')
        }, 100);
    }

    function NavToUnitExam() {
        setTimeout(function () {
            navigate('/unitexam')
        }, 100);
    }

    function backToUnits() {
        setTimeout(function () {
            navigate('/units')
        }, 100);
    }

    async function getLessonlages(stdId) {
        try {

            const { data } = await axios.get('http://localhost:8080/solve/getLessonsFlags/' + stdId + "/" + localStorage.getItem('subId') + "/" + localStorage.getItem('unitNumber'), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setLessonFlages(data);
            console.log(data);

        } catch (error) {
            console.log("error in units");
        }
    }


    async function getStudentByEmail() {
        let studentEmail = {
            email: localStorage.getItem("userEmail")
        }

        try {
            const formData = objectToFormData(studentEmail);
            const { data } = await axios.post('http://localhost:8080/user/getUserByEmail', formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            setStudent(data);

        } catch (error) {
            console.log(error);
        }
    }

    const objectToFormData = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return formData;
    };




    return (
        <>
            <Header />
            {lesson === null || lessonFlages === null ? <>
                <div className='mt-5'>.</div>
                <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                    <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                </div>
            </> : <>
                <div className='mt-5'>.</div>
                <div className=" w-75 m-auto mt-3 rounded-5 pb-3" style={{ backgroundColor: '#ecf0f3' }}>
                    <div className=' w-100 overflow-auto'>

                        {/* Lesson Name & Teacher Name */}
                        {/* <div className='d-flex justify-content-between w-100 pt-3'>

                            <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center ms-5 '>

                                <div className={LessonCss.user + " "}>
                                    <img src={require('../../images/userr.png')} className='w-100' alt="" />
                                </div>
                                <div className='pt-2'><p className={LessonCss.bold + " pt-2"}>{localStorage.getItem("teacherName")}</p></div>

                            </div>

                            <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center me-5'>

                                <div className='pt-2'><p className={LessonCss.bold + " pt-2"}>{localStorage.getItem('unitName')}</p></div>

                            </div>



                        </div> */}

                        <div className={LessonCss.container + " mt-3"}>
                            <div className={LessonCss.infoSection}>
                                <div className={LessonCss.userImage}>
                                    <img src={require('../../images/userr.png')} className="img-fluid" alt="teacher photo" />
                                </div>
                                <p className="text pt-3">{localStorage.getItem("teacherName")}</p>
                            </div>

                            <div className={LessonCss.infoSection + " pt-2"}>
                                <p className={LessonCss.text + " pb-3 me-2"}>{localStorage.getItem('unitName')}</p>
                            </div>
                        </div>

                        {/* lessons */}


                        {lesson.map(function (lesson, idx) {
                            return <div key={idx}>
                                <div className='text-dark card w-75 m-auto mt-1  rounded-3 p-2'>
                                    <div className='card body p-2'>
                                        <h4 className='card-title text-center'>{lesson.title}</h4>



                                        {lessonFlages[idx].Flag === true ?
                                            <div className='text-center row justify-content-center mt-3'>
                                                <div className='col-3'>
                                                    <button onClick={() => { NavTolessonExplanation(lesson.number, lesson.title) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                                                </div>
                                            </div> :
                                            <div className='text-center row justify-content-center mt-3'>
                                                <div className='col-3'>
                                                    <button className='btn btn-danger w-100' disabled={true}>{t("lockBtn")}</button>
                                                </div>
                                            </div>}

                                    </div>

                                </div>
                            </div>
                        })}
                        {/* Unit Exam */}
                        <div className='text-dark card w-75 m-auto mt-1  rounded-3 p-2'>
                            <div className='card body p-2'>
                                <h4 className='card-title text-center'>{" امتحان وحدة " + localStorage.getItem('unitName')} </h4>
                                <div className='text-center row justify-content-center mt-3'>
                                    <div className="col-3">
                                        <button onClick={() => { NavToUnitExam() }} className='btn btn-success w-100'>{t("openBtn")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-100 row justify-content-center'>
                            <div className='col-6 '>
                                <button onClick={backToUnits} className='w-100 btn btn-primary m-3 rounded-4 fs-6'>{t("backToUnits")}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </>}



        </>
    )
}
