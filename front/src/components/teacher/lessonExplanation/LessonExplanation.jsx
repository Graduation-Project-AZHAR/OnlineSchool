import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import ReactPlayer from 'react-player'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function LessonExplanation() {

  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  
  useEffect(() => {
    window.document.dir = i18n.dir();
    
  }, [lng])

  const [selectMode, setselectMode] = useState(1);
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState(null);
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
        navigate('/teacherHome')
      }, 0);
  }

  useEffect(() => {
    lessonExpCheckPath();
    getLessons();
  }, []);

  function checkMode(mode) {
    setselectMode(mode);
  }

  function backToLessons() {
    setTimeout(function () {
      navigate('/teacherLesson')
    }, 100);
  }



  return (
    <>
      <Header />
      <div className='mt-5'>.</div>
      <div className='w-75 m-auto text-center mt-3'>
        <h2>{localStorage.getItem("lessonName")}</h2>
      </div>
      {/* Select mode for student (video or explanation or exam) */}
      <div className='w-75 m-auto'>
        <div className='row w-100 m-auto mt-4'>
          <div className='col-lg-4 col-sm-12 mt-3'>
            <button onClick={() => checkMode(1)} className='btn btn-danger w-100 rounded-4'>{t("video")} <i className='fa-solid fa-play ms-1'></i></button>
          </div>
          <div className='col-lg-4 col-sm-12 mt-3'>
            <button onClick={() => checkMode(2)} className='btn btn-success w-100 rounded-4'>{t("exp")}  <i className='fa-solid fa-chalkboard-user ms-1'></i> </button>
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
                                    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                      <p>{lesson.explantions[idx]}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}



                    </div>
                  }
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
                  <div className='p-4'>

                    {questions.map(function (q, idx) {
                      return (
                        <div key={idx}>
                          <div className='card rounded-4 mt-2'>
                            <div className='card-body'>
                              <div className='row justify-content-center'>
                                {/* body of question */}
                                <div className='col-11'>
                                  <div className='w-100 p-2 fs-4'>
                                    <p>{`${idx + 1}) ${q.question}`}</p>
                                  </div>
                                </div>
                              </div>
                              <div className='row justify-content-center'>
                                {/* options of question */}
                                <div className='row justify-content-center'>
                                  {q.options.map(function (opt, index) {
                                    return (
                                      <div key={index} className='col-2' style={{ fontSize: "18px" }}>
                                        <p>
                                          {`${index + 1}) ${opt}`}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className='row justify-content-center'>
                                  {/* body of question */}
                                  <div className='col-11'>
                                    <div className='w-100 p-2 fs-4 text-success'>
                                      <p>{`${t("ans")} : ${q.answer}`}</p>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className='w-100 row justify-content-center mt-3'>
                      <div className='col-6 '>
                        <button onClick={backToLessons} className='w-100 btn btn-primary m-1 rounded-4 fs-6'>{t("backToLessons")}</button>
                      </div>
                    </div>

                  </div>
                }
              </div>
          }
        </div>
      </div>


    </>
  )
}
