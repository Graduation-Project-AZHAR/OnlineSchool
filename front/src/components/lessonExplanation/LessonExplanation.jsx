import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import ReactPlayer from 'react-player'
import SubjectCss from '../subject/subjext.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function LessonExplanation() {
    const { t } = useTranslation();

    const [selectMode, setselectMode] = useState(1);
    const [lesson, setLesson] = useState(null);

    const [showFinalResults, setShowFinalResults] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const navigate = useNavigate();


    async function getLessons() {
        try {
            const { data } = await axios.get('http://localhost:8080/lesson/getOneLesson/' + localStorage.getItem('subId') + "/" + localStorage.getItem('unitNumber') + "/" + localStorage.getItem('lessonNumber'), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setLesson(data);
            setQuestions(data.exercise.questionAndAnswer);
        } catch (error) {
            console.log(error);
        }
    }


    function lessonExpCheckPath() {
        if (localStorage.getItem("subId") === null || localStorage.getItem("subName") === null || localStorage.getItem("unitNumber") === null || localStorage.getItem("unitName") === null || localStorage.getItem("lessonNumber") === null || localStorage.getItem("lessonName") === null)
            setTimeout(function () {
                navigate('/subject')
            }, 0);
    }
    useEffect(() => {

        lessonExpCheckPath();
        getLessons();
        getStudentByEmail();
    }, [])


    function optionClicked(option, rightAnswer) {
        if (option === rightAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            setShowFinalResults(true);
        }
    }


    const objectToFormData = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return formData;
    };

    async function sendScoreToApi(score) {
        try {

            let scoreObject = {
                grade: score
            }
            const formData = objectToFormData(scoreObject);

            const { data } = await axios.post('http://localhost:8080/solve/addGrade/' + lesson.exercise.number + "/" + studentData.id, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });

            console.log(data);
        } catch (error) {
            console.log("error in send score of unit Test To Api");
        }

        setTimeout(function () {
            navigate('/lessonExplanation');
            setselectMode(1);
        }, 100);
    }

    function checkMode(mode) {
        setselectMode(mode);
    }

    function backToLessons() {
        setTimeout(function () {
            navigate('/lesson')
        }, 100);
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
            setStudentData(data);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Header />
            <div className='mt-5'>.</div>
            <div className='w-75 m-auto text-center mt-3'>

                <div className={SubjectCss.headerContainer}>
                    <h2 className={SubjectCss.customHeading + " pt-2"}>
                        {localStorage.getItem("lessonName")}
                    </h2>
                </div>

                <h2></h2>


            </div>
            {/* Select mode for student (video or explanation or exam) */}
            <div className='w-75 m-auto'>
                <div className='row w-100 m-auto mt-4'>
                    <div className='col-lg-4 col-sm-12 mt-3'>
                        <button onClick={() => checkMode(1)} className='btn btn-danger w-100 rounded-4'>{t("video")} <i className='fa-solid fa-play ms-1'></i></button>
                    </div>
                    <div className='col-lg-4 col-sm-12 mt-3'>
                        <button onClick={() => checkMode(2)} className='btn btn-success w-100 rounded-4'>{t("exp")} <i className='fa-solid fa-chalkboard-user ms-1'></i> </button>
                    </div>
                    <div className='col-lg-4 col-sm-12 mt-3'>
                        <button onClick={() => checkMode(3)} className='btn btn-primary w-100 rounded-4'>{t("exercise")} <i className='fa-solid fa-user-pen ms-1'></i></button>
                    </div>
                </div>
            </div>

            <div className=" w-75 m-auto mt-3 pb-3 mb-3 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
                {/* the mode which the student selected */}
                <div>
                    {selectMode === 1 ?
                        // video part
                        <>
                            <div>
                                {lesson === null ?
                                    <> <div className='mt-5'>.</div>
                                        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                            <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                                        </div></>
                                    : <div className='w-100 p-4'>
                                        <ReactPlayer className="w-75 vh-75 m-auto" url={lesson.video_url} controls={true} />
                                    </div>}
                            </div>
                            <div className='w-100 row justify-content-center'>
                                <div className='col-6 '>
                                    <button onClick={backToLessons} className='w-100 btn btn-primary m-1 rounded-4 fs-6'>{t("backToLessons")}</button>
                                </div>
                            </div>
                        </>
                        : selectMode === 2 ?
                            // explanation part
                            <>
                                <div>
                                    {lesson === null ?
                                        <> <div className='mt-5'>.</div>
                                            <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                                <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                                            </div></>
                                        : <div className='p-4'>

                                            {lesson.pictureUrl.map(function (les, idx) {
                                                return (
                                                    <div key={idx}>
                                                        <div className='card rounded-4 mt-2'>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    {/* image */}
                                                                    <div className='col-lg-5 mt-1'>
                                                                        <div className='w-100'>
                                                                            <img src={les} className='w-100' alt={lesson.title + " image " + (idx + 1)} />
                                                                        </div>
                                                                    </div>
                                                                    {/* explain the image */}
                                                                    <div className='col-lg-7 mt-1'>
                                                                        <div className='w-100 h-100 d-flex justify-content-center align-items-center fs-5'>
                                                                            <p>{lesson.explantions[idx]}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}



                                        </div>}
                                </div>
                                <div className='w-100 row justify-content-center'>
                                    <div className='col-6 '>
                                        <button onClick={backToLessons} className='w-100 btn btn-primary m-1 rounded-4 fs-6'>{t("backToLessons")}</button>
                                    </div>
                                </div>
                            </>
                            :
                            // exam part
                            <div>
                                {questions === null ?
                                    <> <div className='mt-5'>.</div>
                                        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                            <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                                        </div></>
                                    :
                                    <div className='overflow-auto'>
                                        {/* Header */}
                                        <div className='text-center mt-3 w-100' >
                                            <h2 className='mt-3'>{" امتحان درس " + localStorage.getItem('lessonName')}</h2>
                                            <h4 className='mt-3'>{t("currentQ")} {score}</h4>
                                        </div>
                                        {showFinalResults ? <>
                                            {/* Final result */}
                                            <div className='text-dark card w-50 m-auto mt-3  rounded-3 p-2 '>
                                                <div className='card body p-4'>
                                                    <h2 className='card-title text-center mb-4 fs-5'>{t("finalResult")}</h2>
                                                    <h4 className='card-text text-center mb-4 fs-5'>{score} {t("out")} {questions.length} {t("correct")} - ({(score / questions.length).toFixed(2) * 100}%)</h4>
                                                    <button onClick={() => sendScoreToApi(score)} className='btn btn-primary'>{t("submit")}</button>
                                                </div>
                                            </div>
                                        </>
                                            : <>
                                                {/* Question Card */}

                                                <div className='text-dark card w-75 m-auto mt-3  rounded-3 p-2 '>
                                                    <div className='card body p-4'>
                                                        <h4 className='card-title text-center mb-4 fs-5'>{t("qNum")} {currentQuestion + 1} {t("out")} {questions.length}</h4>
                                                        <p className='card-text text-center mb-4 fs-5'>{questions[currentQuestion].question}</p>
                                                        <ul className='list-unstyled text-center'>
                                                            {questions[currentQuestion].options.map((option, idx) => {
                                                                return (
                                                                    <li key={idx} onClick={() => optionClicked(option, questions[currentQuestion].answer)} className='bg-info p-3 border border-white border-4 rounded-4 mt-2 ' style={{ cursor: 'pointer' }}>{option}</li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>

                                                </div>





                                            </>}



                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>


        </>

    )
}
