import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UnitCss from '../../units/units.module.css'
import axios from 'axios';
import Header from '../../header/Header';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function Units() {

    const { t, i18n } = useTranslation();
    const lng = cookies.get("i18next") || "en";

    useEffect(() => {
        window.document.dir = i18n.dir();

    }, [lng])

    const changeLanguage = (lang) => {

        i18n.changeLanguage(lang);
    };

    const navigate = useNavigate();
    const [unit, setUnit] = useState(null);

    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [isCorrectQuestion, setIsCorrectQuestion] = useState(true);
    const [reRender, setReRender] = useState(0);

    async function getUnits() {
        try {

            const { data } = await axios.get('http://localhost:8080/subject/subjectUnites/' + localStorage.getItem('subId'), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setUnit(data);

        } catch (error) {
            console.log(error);
        }

    }

    function unitPathCheck() {
        if (localStorage.getItem("subId") === null || localStorage.getItem("subName") === null)
            setTimeout(function () {
                navigate('/teacherHome')
            }, 0);
    }

    useEffect(() => {
        unitPathCheck();
        getUnits();
    }, []);





    function NavTolesson(unitNumber, unitName) {
        localStorage.setItem('unitNumber', unitNumber);
        localStorage.setItem('unitName', unitName);
        setTimeout(function () {
            navigate('/teacherlesson')
        }, 100);
    }

    function backToSubjects() {
        setTimeout(function () {
            navigate('/teacherHome')
        }, 100);
    }
    const objectToFormData = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return formData;
    };
    //------------------------------------------------------------------------



    //-----------------------------Add Question Part ----------------------------
    let question = {
        subjectId: 0,
        uniteNumber: 0,
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

                const { data } = await axios.post('http://localhost:8080/exercise/AddUniteExercise/' + values.subjectId + "/" + values.uniteNumber, formData, {
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

    function handleShowAddQ(unitNumber, unitName) {
        setShowAddQuestion(true);
        setSelectedUnit(unitNumber);
        localStorage.setItem('unitName', unitName);
        formikObjForAddQ.values.subjectId = Number(localStorage.getItem('subId'));
        formikObjForAddQ.values.uniteNumber = unitNumber;
        formikObjForAddQ.values.Question = '';
        formikObjForAddQ.values.Answer = '';
        formikObjForAddQ.values.options = [];

    }
    function hideQuestionCheckModel() {
        setIsCorrectQuestion(true);
    }
    //-----------------------------------End-----------------------------------



    //---------------------------------Add Unit Part---------------------------


    let newUnit = {
        Subject_id: 0,
        title: "",
        description: ""
    }
    async function addUnit(values) {

        const formData = objectToFormData(values);
        try {

            const { data } = await axios.post('http://localhost:8080/unite/addUnite/' + values.Subject_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            console.log(data);
        } catch (error) {
            console.log("catch error: ", error);
        }
        setShowAddUnit(false);
        setReRender(reRender + 1);
    }

    const formikObjForAddUnit = useFormik({

        initialValues: newUnit,

        onSubmit: addUnit
    });

    function handleCloseAddUnit() {
        setShowAddUnit(false);
    }

    function handleShowAddUnit() {
        setShowAddUnit(true);
        formikObjForAddUnit.values.Subject_id = Number(localStorage.getItem('subId'));
        formikObjForAddUnit.values.title = '';
        formikObjForAddUnit.values.description = '';

    }

    useEffect(() => {
        getUnits();
    }, [reRender])





    return (
        <>
            <Header />
            {unit === null ? <>
                <div className='mt-5'>.</div>
                <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                    <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>

                </div>
            </> : <>
                <div className='mt-5'>.</div>
                <div className=" w-75 m-auto mt-3 pb-3 mb-3 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
                    <div className=' w-100 overflow-auto'>

                        <div className={UnitCss.container + " mt-3 " }>

                            <div className={UnitCss.infoSection + " pt-2 text-center fs-5  m-auto"}>
                                <p className={UnitCss.text + " pb-3 me-2"}>{localStorage.getItem('subName')}</p>
                            </div>
                        </div>

                        {/* Units */}

                        {unit.map(function (unit, idx) {
                            return <div key={idx}>
                                <div className='text-dark card w-75 m-auto mt-1  rounded-3 p-2'>
                                    <div className='card body p-2 text-center'>
                                        <h4 className='card-title'>{unit.title}</h4>
                                        <p className='card-text'>{unit.description}</p>
                                        <div className='row mt-4 justify-content-center'>
                                            <div className='col-3'>
                                                <button onClick={() => { NavTolesson(unit.number, unit.title) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                                            </div>
                                            <div className='col-3'>
                                                <button onClick={() => { handleShowAddQ(unit.number, unit.title) }} className='btn btn-secondary w-100'>{t("AddQ")}</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        })}

                        <div className='w-100 row justify-content-center'>
                            <div className='col-4 '>
                                <button onClick={backToSubjects} className='w-100 btn btn-primary m-3 rounded-4 fs-6'>{t("backToSubjects")}</button>
                            </div>
                            <div className='col-4'>
                                <button onClick={handleShowAddUnit} className='btn btn-success w-100 m-3 rounded-4 fs-6'>{t("AddU")}</button>
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

                    <Form.Control onChange={formikObjForAddQ.handleChange} className='d-none' type="number" value={formikObjForAddQ.values.uniteNumber = selectedUnit} />

                    <Form.Label className='fs-6' >{t("QText")}</Form.Label>

                    <Form.Control onChange={formikObjForAddQ.handleChange} value={formikObjForAddQ.values.Question} type="text"name="Question" />

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

            {/* Add unit model */}
            <Modal show={showAddUnit} onHide={handleCloseAddUnit}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("AddU")}</Modal.Title>
                </Modal.Header>

                <Modal.Body className='p-3'>

                    <Form.Control onChange={formikObjForAddUnit.handleChange} className='d-none' type="number" value={formikObjForAddUnit.values.Subject_id = Number(localStorage.getItem('subId'))} />


                    <Form.Label className='fs-6' >{t("unitTitle")}</Form.Label>

                    <Form.Control onChange={formikObjForAddUnit.handleChange} value={formikObjForAddUnit.values.title} type="text" name="title" />

                    <Form.Label className='fs-6 mt-3' >{t("unitDesc")}</Form.Label>

                    <Form.Control onChange={formikObjForAddUnit.handleChange} value={formikObjForAddUnit.values.description} type="text" name="description" />

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddUnit}>
                    {t("close")}
                    </Button>
                    <Button variant="primary" type='submit' onClick={formikObjForAddUnit.handleSubmit} disabled={
                        formikObjForAddUnit.values.title === "" ||
                        formikObjForAddUnit.values.description === ""
                    } >
                        {t("add")}
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}
