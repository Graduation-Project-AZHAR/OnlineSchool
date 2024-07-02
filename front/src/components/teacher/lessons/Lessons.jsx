import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import LessonCss from '../../lesson/Lesson.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function Lessons() {
  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  
  useEffect(() => {
    window.document.dir = i18n.dir();
    
  }, [lng])
  

  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonName, setSelectedLessonName] = useState(null);

  const [isCorrectQuestion, setIsCorrectQuestion] = useState(true);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [reRender, setReRender] = useState(0);

  const [showAddLesson, setShowAddLesson] = useState(false);
  const [onePhotoMore, setOnePhotoMore] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(-1);
  const [explantionIndex, setExplantionIndex] = useState(-1);
  const [needPhoto, setNeedPhoto] = useState(false);

  const [showEditLesson, setShowEditLesson] = useState(false);
  const [photoIndexEdit, setPhotoIndexEdit] = useState(-1);
  const [explantionIndexEdit, setExplantionIndexEdit] = useState(-1);
  const [onePhotoMoreEdit, setOnePhotoMoreEdit] = useState(false);
  const [needPhotoEdit, setNeedPhotoEdit] = useState(false);


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
        navigate('/teacherHome')
      }, 0);
    }
  }

  useEffect(() => {
    lessonCheckPath();
    getLessons();

  }, []);

  function NavTolessonExplanation(lessonNumber, lessonName) {
    localStorage.setItem('lessonNumber', lessonNumber);
    localStorage.setItem('lessonName', lessonName);
    setTimeout(function () {
      navigate('/teacherTeacherLessonExplanation')
    }, 100);
  }

  function backToUnits() {
    setTimeout(function () {
      navigate('/teacherunit')
    }, 100);
  }

  const objectToFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return formData;
  };




  //-----------------------------Add Question Part ----------------------------
  let question = {
    subjectId: 0,
    uniteNumber: 0,
    lessonNumber: 0,
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

        const { data } = await axios.post('http://localhost:8080/exercise/AddLessonExercise/' + values.subjectId + "/" + values.uniteNumber + "/" + values.lessonNumber, formData, {
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
    console.log(values);

    setShowAddQuestion(false);
  }

  const formikObjForAddQ = useFormik({

    initialValues: question,

    onSubmit: addQuestion
  });

  function handleCloseAddQ() {
    setShowAddQuestion(false);
  }

  function handleShowAddQ(lessonNumber, LessonName) {
    setShowAddQuestion(true);
    setSelectedLesson(lessonNumber);
    setSelectedLessonName(LessonName);

    formikObjForAddQ.values.subjectId = Number(localStorage.getItem('subId'));
    formikObjForAddQ.values.uniteNumber = Number(localStorage.getItem('unitNumber'));
    formikObjForAddQ.values.lessonNumber = lessonNumber;
    formikObjForAddQ.values.Question = '';
    formikObjForAddQ.values.Answer = '';
    formikObjForAddQ.values.options = [];

  }
  function hideQuestionCheckModel() {
    setIsCorrectQuestion(true);
  }
  //-----------------------------------End-----------------------------------




  //---------------------------------Add Lesson Part---------------------------


  let newLesson = {
    subjectId: 0,
    uniteNumber: 0,
    title: "",
    video_url: "",
    explantions: [],
    picture_url: []
  }
  async function addLesson(values) {

    const formData = objectToFormData(values);
    try {

      const { data } = await axios.post('http://localhost:8080/lesson/AddNewLesson/' + values.subjectId + "/" + values.uniteNumber, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });
    } catch (error) {
      console.log("catch error: ", error);
    }
    setNeedPhoto(false);
    console.log(values);
    setPhotoIndex(-1);
    setExplantionIndex(-1);
    setReRender(reRender + 1);
  }

  const formikObjForAddLesson = useFormik({

    initialValues: newLesson,

    onSubmit: addLesson
  });

  function handleCloseAddLesson() {
    setShowAddLesson(false);
  }

  function handleShowAddLesson() {
    setPhotoIndex(photoIndex + 1);
    setExplantionIndex(explantionIndex + 1);
    setShowAddLesson(true);
    formikObjForAddLesson.values.subjectId = Number(localStorage.getItem('subId'));
    formikObjForAddLesson.values.uniteNumber = Number(localStorage.getItem('unitNumber'));
    formikObjForAddLesson.values.title = '';
    formikObjForAddLesson.values.video_url = '';
    formikObjForAddLesson.values.picture_url = [];
    formikObjForAddLesson.values.explantions = []

  }


  function showAddNewPhoto() {
    setOnePhotoMore(true);
  }
  function closeAddNewPhoto() {
    setPhotoIndex(photoIndex + 1);
    setExplantionIndex(explantionIndex + 1);
    setNeedPhoto(true);
    setOnePhotoMore(false);
  }

  function shownNeedPhoto() {
    setPhotoIndex(photoIndex + 1);
    setExplantionIndex(explantionIndex + 1);
    setShowAddLesson(false);
    setNeedPhoto(true);
  }
  function closenNeedPhoto() {
    setNeedPhoto(false);
  }

  useEffect(() => {
    getLessons();
  }, [reRender])

  //------------------------------------------------------------------------------------------



  // --------------------- Edit Lesson Part-----------------------------------

  let updatedLesson = {
    subjectId: 0,
    uniteNumber: 0,
    lessonNumber: 0,
    title: "",
    video_url: "",
    explantions: [],
    picture_url: []
  }

  async function editLesson(values) {

    const formData = objectToFormData(values);

    try {

      const { data } = await axios.put('http://localhost:8080/lesson/UpdateLesson/' + values.subjectId + "/" + values.uniteNumber + "/" + values.lessonNumber, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });
      console.log(data);
    } catch (error) {
      console.log("catch error: ", error);
    }

    setNeedPhotoEdit(false);
    console.log(values);
    setPhotoIndexEdit(-1);
    setExplantionIndexEdit(-1);
    setReRender(reRender + 1);
  }

  const formikObjForEditLesson = useFormik({

    initialValues: updatedLesson,

    onSubmit: editLesson
  });

  function handleCloseEditLesson() {
    setShowEditLesson(false);
  }

  function handleShowEditLesson(lessonNumber, lessonName) {
    setPhotoIndexEdit(photoIndexEdit + 1);
    setExplantionIndexEdit(explantionIndexEdit + 1);
    setShowEditLesson(true);
    setSelectedLessonName(lessonName);

    formikObjForEditLesson.values.subjectId = Number(localStorage.getItem('subId'));
    formikObjForEditLesson.values.uniteNumber = Number(localStorage.getItem('unitNumber'));
    formikObjForEditLesson.values.lessonNumber = lessonNumber;
    formikObjForEditLesson.values.title = '';
    formikObjForEditLesson.values.video_url = '';
    formikObjForEditLesson.values.picture_url = [];
    formikObjForEditLesson.values.explantions = []

  }

  function showEditNewPhoto() {
    setOnePhotoMoreEdit(true);
  }

  function closeEditNewPhoto() {
    setPhotoIndexEdit(photoIndexEdit + 1);
    setExplantionIndexEdit(explantionIndexEdit + 1);
    setNeedPhotoEdit(true);
    setOnePhotoMoreEdit(false);
  }

  function shownNeedPhotoEdit() {
    setPhotoIndexEdit(photoIndexEdit + 1);
    setExplantionIndexEdit(explantionIndexEdit + 1);
    setShowEditLesson(false);
    setNeedPhotoEdit(true);
  }

  function closenNeedPhotoEdit() {
    setNeedPhotoEdit(false);
  }


  //-----------------------------------------------------------------------------






  return (
    <>
      <Header />
      {lesson === null ? <>
        <div className='mt-5'>.</div>
        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
          <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
        </div>
      </> : <>
        <div className='mt-5'>.</div>
        <div className=" w-75 m-auto mt-3 rounded-5 pb-3" style={{ backgroundColor: '#ecf0f3' }}>
          <div className=' w-100 overflow-auto'>

            <div className={LessonCss.container + " mt-3"}>


              <div className={LessonCss.infoSection + " pt-2 text-center fs-5  m-auto"}>
                <p className={LessonCss.text + " pb-3 me-2"}>{localStorage.getItem('subName')}</p>
              </div>
            </div>

            {/* lessons */}


            {lesson.map(function (lesson, idx) {
              return <div key={idx}>
                <div className='text-dark card w-75 m-auto mt-1  rounded-3 p-2'>
                  <div className='card body p-2 text-center'>
                    <h4 className='card-title'>{lesson.title}</h4>
                    <div className='row mt-4 justify-content-center'>
                      <div className='col-3'>
                        <button onClick={() => { NavTolessonExplanation(lesson.number, lesson.title) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                      </div>
                      <div className='col-3'>
                        <button onClick={() => { handleShowEditLesson(lesson.number, lesson.title) }} className='btn btn-success w-100'>{t("edit")}</button>
                      </div>
                      <div className='col-3'>
                        <button onClick={() => { handleShowAddQ(lesson.number, lesson.title) }} className='btn btn-secondary w-100'>{t("AddQ")}</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            })}




            <div className='w-100 row justify-content-center'>
              <div className='col-4 '>
                <button onClick={backToUnits} className='w-100 btn btn-primary m-3 rounded-4 fs-6'>{t("backToUnits")}</button>
              </div>
              <div className='col-4'>
                <button onClick={handleShowAddLesson} className='btn btn-success w-100 m-3 rounded-4 fs-6'>{t("AddL")}</button>
              </div>
            </div>

          </div>
        </div>
      </>}




      {/* Add question model */}
      <Modal show={showAddQuestion} onHide={handleCloseAddQ}>
        <Modal.Header closeButton>
          <Modal.Title>{t("AddQ")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='p-3'>

          <Form.Control onChange={formikObjForAddQ.handleChange} className='d-none' type="number" value={formikObjForAddQ.values.subjectId = Number(localStorage.getItem('subId'))} />

          <Form.Control onChange={formikObjForAddQ.handleChange} className='d-none' type="number" value={formikObjForAddQ.values.uniteNumber = Number(localStorage.getItem('uniteNumber'))} />

          <Form.Control onChange={formikObjForAddQ.handleChange} className='d-none' type="number" value={formikObjForAddQ.values.uniteNumber = selectedLesson} />

          <Form.Label className='fs-6' >{t("QText")}</Form.Label>

          <Form.Control onChange={formikObjForAddQ.handleChange} value={formikObjForAddQ.values.Question} type="text"  name="Question" />

          <Form.Label className='fs-6 mt-3' >{t("ans")}</Form.Label>

          <Form.Control onChange={formikObjForAddQ.handleChange} value={formikObjForAddQ.values.Answer} type="text"  name="Answer" />


          <Form.Label className='fs-6 mt-3' >{t("opt1")}</Form.Label>
          <Form.Control
            value={formikObjForAddQ.values.options[0] || ''}
            onChange={(e) => {
              const newOptions = [...formikObjForAddQ.values.options];
              newOptions[0] = e.target.value;
              formikObjForAddQ.setFieldValue('options', newOptions);
            }}

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
          <Button variant="primary" type='submit' onClick={formikObjForAddQ.handleSubmit} disabled={
            formikObjForAddQ.values.Question === "" ||
            formikObjForAddQ.values.Answer === "" ||
            formikObjForAddQ.values.options.length < 4
          } >
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
          {t("cantAddQ")}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className='m-auto' onClick={hideQuestionCheckModel}>
          {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Add lesson model */}
      <Modal show={showAddLesson} onHide={handleCloseAddLesson}>
        <Modal.Header closeButton>
          <Modal.Title>{t("AddL")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='p-3'>

          <Form.Control onChange={formikObjForAddLesson.handleChange} className='d-none' type="number" value={formikObjForAddLesson.values.subjectId = Number(localStorage.getItem('subId'))} />

          <Form.Control onChange={formikObjForAddLesson.handleChange} className='d-none' type="number" value={formikObjForAddLesson.values.uniteNumber = Number(localStorage.getItem('unitNumber'))} />


          <Form.Label className='fs-6' >{t("lessonTitle")}</Form.Label>

          <Form.Control onChange={formikObjForAddLesson.handleChange} value={formikObjForAddLesson.values.title} type="text"  name="title" />

          <Form.Label className='fs-6 mt-3' >{t("vidUrl")}</Form.Label>

          <Form.Control onChange={formikObjForAddLesson.handleChange} value={formikObjForAddLesson.values.video_url} type="text" name="video_url" />


          <Form.Label className='fs-6 mt-3' >{t("picUrl")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForAddLesson.values.picture_url];
              newOptions[photoIndex] = e.target.value;
              formikObjForAddLesson.setFieldValue('picture_url', newOptions);
            }}
            value={formikObjForAddLesson.values.picture_url[photoIndex] || ''}
            type="text"
            name={"photo_url " + photoIndex}
          />

          <Form.Label className='fs-6 mt-3' >{t("picExp")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForAddLesson.values.explantions];
              newOptions[explantionIndex] = e.target.value;
              formikObjForAddLesson.setFieldValue('explantions', newOptions);
            }}
            value={formikObjForAddLesson.values.explantions[explantionIndex] || ''}
            type="text"
            name={"explantion " + explantionIndex}
          />


        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddLesson}>
          {t("close")}
          </Button>
          <Button variant="primary" type='submit' onClick={shownNeedPhoto} disabled={
            formikObjForAddLesson.values.title === "" ||
            formikObjForAddLesson.values.video_url.length<12||
            formikObjForAddLesson.values.picture_url.length < photoIndex + 1 ||
            formikObjForAddLesson.values.explantions.length < explantionIndex + 1
          } >
            {t("add")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Ask for adding more photo */}
      <Modal show={needPhoto} onHide={closenNeedPhoto}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <p className='fs-5'>
          {t("askAdd")}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={formikObjForAddLesson.handleSubmit} >
          {t("no")}
          </Button>
          <Button variant="primary" onClick={showAddNewPhoto}  >
          {t("yes")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {Adding more photo} */}
      <Modal show={onePhotoMore} onHide={closeAddNewPhoto}>
        <Modal.Header>
          <Modal.Title>{t("addMore")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Label className='fs-6 mt-3' >{t("picUrl")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForAddLesson.values.picture_url];
              newOptions[photoIndex] = e.target.value;
              formikObjForAddLesson.setFieldValue('picture_url', newOptions);
            }}
            value={formikObjForAddLesson.values.picture_url[photoIndex] || ''}
            type="text"
            name={"photo_url " + photoIndex}
          />

          <Form.Label className='fs-6 mt-3' >{t("picExp")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForAddLesson.values.explantions];
              newOptions[explantionIndex] = e.target.value;
              formikObjForAddLesson.setFieldValue('explantions', newOptions);
            }}
            value={formikObjForAddLesson.values.explantions[explantionIndex] || ''}
            type="text"
            name={"explantion " + explantionIndex}
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type='submit' onClick={closeAddNewPhoto} disabled={
          
            formikObjForAddLesson.values.picture_url.length < photoIndex + 1 ||
            formikObjForAddLesson.values.explantions.length < explantionIndex + 1
          } >
            {t("add")}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Edit lesson model */}
      <Modal show={showEditLesson} onHide={handleCloseEditLesson}>
        <Modal.Header closeButton>
          <Modal.Title>{t("edit")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='p-3'>

          <Form.Control onChange={formikObjForEditLesson.handleChange} className='d-none' type="number" value={formikObjForEditLesson.values.subjectId = Number(localStorage.getItem('subId'))} />

          <Form.Control onChange={formikObjForEditLesson.handleChange} className='d-none' type="number" value={formikObjForEditLesson.values.uniteNumber = Number(localStorage.getItem('unitNumber'))} />

          <Form.Control onChange={formikObjForEditLesson.handleChange} className='d-none' type="number" value={formikObjForEditLesson.values.lessonNumber} />


          <Form.Label className='fs-6' >{t("lessonTitle")}</Form.Label>

          <Form.Control onChange={formikObjForEditLesson.handleChange} value={formikObjForEditLesson.values.title} type="text"  name="title" />

          <Form.Label className='fs-6 mt-3' >{t("vidUrl")}</Form.Label>

          <Form.Control onChange={formikObjForEditLesson.handleChange} value={formikObjForEditLesson.values.video_url} type="text" name="video_url" />


          <Form.Label className='fs-6 mt-3' >{t("picUrl")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForEditLesson.values.picture_url];
              newOptions[photoIndexEdit] = e.target.value;
              formikObjForEditLesson.setFieldValue('picture_url', newOptions);
            }}
            value={formikObjForEditLesson.values.picture_url[photoIndexEdit] || ''}
            type="text"
            name={"photo_url " + photoIndexEdit}
          />

          <Form.Label className='fs-6 mt-3' >{t("picExp")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForEditLesson.values.explantions];
              newOptions[explantionIndexEdit] = e.target.value;
              formikObjForEditLesson.setFieldValue('explantions', newOptions);
            }}
            value={formikObjForEditLesson.values.explantions[explantionIndexEdit] || ''}
            type="text"
            name={"explantion " + explantionIndexEdit}
          />


        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditLesson}>
          {t("close")}
          </Button>
          <Button variant="primary" type='submit' onClick={shownNeedPhotoEdit} disabled={
            formikObjForAddLesson.values.video_url.length<12
          }>
          {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Ask for editting more photo */}
      <Modal show={needPhotoEdit} onHide={closenNeedPhotoEdit}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <p className='fs-5'>
          {t("askAdd")}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={formikObjForEditLesson.handleSubmit} >
          {t("no")}
          </Button>
          <Button variant="primary" onClick={showEditNewPhoto}  >
          {t("yes")}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* {Editting more photo} */}
      <Modal show={onePhotoMoreEdit} onHide={closeEditNewPhoto}>
        <Modal.Header>
          <Modal.Title>{t("addMore")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Label className='fs-6 mt-3' >{t("picUrl")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForEditLesson.values.picture_url];
              newOptions[photoIndexEdit] = e.target.value;
              formikObjForEditLesson.setFieldValue('picture_url', newOptions);
            }}
            value={formikObjForEditLesson.values.picture_url[photoIndexEdit] || ''}
            type="text"
            name={"photo_url " + photoIndexEdit}
          />

          <Form.Label className='fs-6 mt-3' >{t("picExp")}</Form.Label>
          <Form.Control
            onChange={(e) => {
              const newOptions = [...formikObjForEditLesson.values.explantions];
              newOptions[explantionIndexEdit] = e.target.value;
              formikObjForEditLesson.setFieldValue('explantions', newOptions);
            }}
            value={formikObjForEditLesson.values.explantions[explantionIndexEdit] || ''}
            type="text"
            name={"explantion " + explantionIndexEdit}
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type='submit' onClick={closeEditNewPhoto}  >
          {t("add")}
          </Button>
        </Modal.Footer>
      </Modal>





    </>
  )
}
