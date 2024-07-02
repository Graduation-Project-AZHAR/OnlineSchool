import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import axios from 'axios';
import HomeCss from '../home/home.module.css'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import SubjectCss from '../../subject/subjext.module.css'
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function Home() {

  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  
  useEffect(() => {
    window.document.dir = i18n.dir();
    
  }, [lng])
  
  const changeLanguage = (lang) => {
    
    i18n.changeLanguage(lang);
  };

  const navigate = useNavigate();
  const [Subject, setSubject] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [reRender, setReRender] = useState(0);

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [isCorrectQuestion, setIsCorrectQuestion] = useState(true)

  const [teacher, setTeacher] = useState(null);

  async function getTeacherByEmail() {
    let teacherEmail = {
      email: localStorage.getItem("userEmail")
    }

    try {
      const formData = objectToFormData(teacherEmail);
      const { data } = await axios.post('http://localhost:8080/user/getUserByEmail', formData,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("tkn")
          }
        });
      setTeacher(data);

    } catch (error) {
      console.log(error);
    }
  }


  async function getSubjects(teacherId) {
    console.log("Hi1" + teacherId);
    try {

      const { data } = await axios.get('http://localhost:8080/subject/subjects',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("tkn")
          }
        });
      const teacherSubject = data.filter(data => data.teacher === teacherId);
      setSubject(teacherSubject);

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {

    getTeacherByEmail();
  }, []);

  useEffect(() => {
    if (teacher) {
      getSubjects(teacher.id);
    }
  }, [teacher]);

  useEffect(() => {
    if (teacher) {
      getSubjects(teacher.id);
    }
  }, [reRender]);



  function navToUnit(subId, subName, subPhoto) {
    localStorage.setItem('subId', subId);
    localStorage.setItem('subName', subName);
    localStorage.setItem('subPhoto', subPhoto);

    setTimeout(function () {
      navigate('/teacherunit')
    }, 100);
  }





  // Edit part
  let subject = {
    subjectId: 0,
    title: "",
    description: ""
  }

  const objectToFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return formData;
  };

  async function editSubject(values) {
    console.log(values);

    const formData = objectToFormData(values);

    try {
      const { data } = await axios.put('http://localhost:8080/subject/updateSubject/' + values.subjectId, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")

        }
      });
    } catch (error) {
      console.log("catch error: ", error);
    }

    setReRender(reRender + 1);
    setShowEdit(false);
  }

  const formikObj = useFormik({

    initialValues: subject,

    onSubmit: editSubject
  });

  function handleClose() {
    setShowEdit(false);
  }

  function handleShow(subId, subName) {
    setShowEdit(true);
    setSelectedSub(subId);
    localStorage.setItem("subName", subName);
    formikObj.values.subjectId = subId;
    formikObj.values.title = '';
    formikObj.values.description = '';

  }





  //Add Question Part 
  let question = {
    subjectId: 0,
    Question: "",
    Answer: "",
    options: []
  }

  async function addQuestion(values) {
    let flag = false;

    for (let i = 0; i < values.options.length; i++)
      if (values.options[i] === values.Answer)
        flag = true;

    if (!flag) {
      setIsCorrectQuestion(false);
    }

    else {
      const formData = objectToFormData(values);
      try {

        const { data } = await axios.post('http://localhost:8080/subject/AddFinalQuestionAnswer/' + values.subjectId, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("tkn")
          }
        });
        console.log(data);
      } catch (error) {
        console.log("catch error: ", error);
      }


    }
    setShowAddQuestion(false);


  }
  const formikObjForAddQ = useFormik({

    initialValues: question,

    onSubmit: addQuestion
  });

  function handleCloseAddQ() {
    setShowAddQuestion(false);
  }

  function handleShowAddQ(subId, subName) {
    setShowAddQuestion(true);
    setSelectedSub(subId);
    localStorage.setItem("subName", subName);
    formikObjForAddQ.values.subjectId = subId;
    formikObjForAddQ.values.Question = '';
    formikObjForAddQ.values.Answer = '';
    formikObjForAddQ.values.options = [];

  }

  function hideQuestionCheckModel() {
    setIsCorrectQuestion(true);
  }



  return (
    <>
      <Header />
      {Subject === null ? <>
        <div className='mt-5'>.</div>
        <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
          <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

        </div>
      </> : <>
        <div className='mt-5'>.</div>
        <div className=" container mt-4 pb-5 rounded-5 overflow-auto " style={{ backgroundColor: '#ecf0f3' }}>
          <div>
            <div className='text-center mt-2' >

              <div className={SubjectCss.headerContainer}>
                <h2 className={SubjectCss.customHeading + " pt-2"}>
                {t("subs")}
                </h2>
              </div>


              <div className={HomeCss.boxcontainer + " p-1"}>

                {Subject.map(function (sub, idx) {
                  return <div key={idx}>
                    <div className='card rounded-4 '>
                      <div className={HomeCss.wdArabic + " p-5"}>
                        <img src={sub.pictureURL} alt={sub.title} className='w-100 card-img-top rounded-4' />
                      </div>
                      <div className='card-body'>
                        <h4 className='card-title'>{sub.title}</h4>
                        <p className='card-text'>{sub.description}</p>
                        <div className='row p-3 justify-content-center'>
                          <div className='col-12 mt-2'>
                            <button onClick={() => { navToUnit(sub.id, sub.title, sub.pictureURL) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                          </div>


                          <div className='col-12 mt-2'>
                            <button onClick={() => handleShow(sub.id, sub.title)} className='btn btn-success w-100'>
                            {t("edit")}
                            </button>
                          </div>


                          <div className='col-12 mt-2'>
                            <button onClick={() => { handleShowAddQ(sub.id, sub.title) }} className='btn btn-secondary w-100'>{t("AddQ")}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                })}


              </div>


              {/* Edit Subject model */}
              <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{t("edit")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-3'>

                  <Form.Control onChange={formikObj.handleChange} className='d-none' type="number" value={formikObj.values.subjectId = selectedSub} />

                  <Form.Label className='fs-6' >{t("subTitle")}</Form.Label>

                  <Form.Control onChange={formikObj.handleChange} value={formikObj.values.title} type="text" placeholder={t("subPlace")} name="title" />

                  <Form.Label className='fs-6 mt-3' >{t("subDesc")}</Form.Label>
                  <Form.Control onChange={formikObj.handleChange} value={formikObj.values.description} type="text" placeholder={t("subDescPlace")} name="description" />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                  {t("close")}
                  </Button>
                  <Button variant="primary" type='submit' onClick={formikObj.handleSubmit}>
                  {t("save")}
                  </Button>
                </Modal.Footer>
              </Modal>


              {/* Add Subject question */}
              <Modal show={showAddQuestion} onHide={handleCloseAddQ}>
                <Modal.Header closeButton>
                  <Modal.Title>{t("AddQ")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-3'>

                  <Form.Control onChange={formikObjForAddQ.handleChange} className='d-none' type="number" value={formikObjForAddQ.values.subjectId = selectedSub} />

                  <Form.Label className='fs-6' >{t("QText")}</Form.Label>

                  <Form.Control onChange={formikObjForAddQ.handleChange} value={formikObjForAddQ.values.Question} type="text"name="Question" />

                  <Form.Label className='fs-6 mt-3' >{t("ans")}</Form.Label>
                  <Form.Control onChange={formikObjForAddQ.handleChange} value={formikObjForAddQ.values.Answer} type="text" name="Answer" />


                  <Form.Label className='fs-6 mt-3' >{t("opt1")}</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      const newOptions = [...formikObjForAddQ.values.options];
                      newOptions[0] = e.target.value;
                      formikObjForAddQ.setFieldValue('options', newOptions);
                    }}
                    value={formikObjForAddQ.values.options[0] || ''}
                    type="text"
                    name="option1"
                  />

                  <Form.Label className='fs-6 mt-3' >{t("opt2")}</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      const newOptions = [...formikObjForAddQ.values.options];
                      newOptions[1] = e.target.value;
                      formikObjForAddQ.setFieldValue('options', newOptions);
                    }}
                    value={formikObjForAddQ.values.options[1] || ''}
                    type="text"
                    name="option2"
                  />

                  <Form.Label className='fs-6 mt-3' >{t("opt3")}</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      const newOptions = [...formikObjForAddQ.values.options];
                      newOptions[2] = e.target.value;
                      formikObjForAddQ.setFieldValue('options', newOptions);
                    }}
                    value={formikObjForAddQ.values.options[2] || ''}
                    type="text"
                    name="option3"
                  />

                  <Form.Label className='fs-6 mt-3' >{t("opt4")}</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      const newOptions = [...formikObjForAddQ.values.options];
                      newOptions[3] = e.target.value;
                      formikObjForAddQ.setFieldValue('options', newOptions);
                    }}
                    value={formikObjForAddQ.values.options[3] || ''}
                    type="text"
                    name="option4"
                  />




                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseAddQ}>
                  {t("close")}
                  </Button>
                  <Button variant="primary" type='submit' onClick={formikObjForAddQ.handleSubmit}
                    disabled={
                      formikObjForAddQ.values.Question === "" ||
                      formikObjForAddQ.values.Answer === "" ||
                      formikObjForAddQ.values.options.length < 4
                    }
                  >
                    {t("save")}
                  </Button>
                </Modal.Footer>
              </Modal>


              {/* isCorrect Question */}
              <Modal show={!isCorrectQuestion} onHide={hideQuestionCheckModel}>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                  <p className='fs-5'>
                    Can't add this question (must one option match the answer).
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" className='m-auto' onClick={hideQuestionCheckModel}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>

          </div>
        </div>
      </>}
    </>
  )
}
