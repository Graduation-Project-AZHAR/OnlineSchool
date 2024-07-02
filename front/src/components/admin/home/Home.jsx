import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderCss from '../../header/header.module.css'
import SubjectCss from '../../subject/subjext.module.css'
import axios from 'axios';
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function Home() {
    const navigate = useNavigate();
    const [selectMode, setSelectMode] = useState(1);
    const { t, i18n } = useTranslation();
    const lng = cookies.get("i18next") || "en";

    useEffect(() => {
        window.document.dir = i18n.dir();

    }, [lng])

    const changeLanguage = (lang) => {

        i18n.changeLanguage(lang);
    };


    const objectToFormData = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return formData;
    };




    //subject part :

    const [Subject, setSubject] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [reRender, setReRender] = useState(0);

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

    async function getTeacherName() {
        try {

            const { data } = await axios.get('http://localhost:8080/teacher/teachers',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            setTeachers(data);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getSubjects();
        getTeacherName();
        getTeachersData();
        getStudentData();
    }, []);

    useEffect(() => {
        getSubjects();
        getTeachersData();

    }, [reRender]);

    let subject = {
        subjectId: 0,
        teacherId: 0
    }

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

    function handleShow(subId) {
        setShowEdit(true);
        formikObj.values.subjectId = subId;
        formikObj.values.teacherId = 0;

    }
    //-----------------------------------------------------------------------

    // teacher part : ------------------------------------------

    // 1) display teacher
    const [teachersData, setTeachersData] = useState(null);
    const [teacherInfo, setTeacherInfo] = useState({
        id: 0,
        name: ""
    });
    const [showIdModel, setShowIdModel] = useState(false)

    function hideShowIdModel() {
        setShowIdModel(false);
    }

    function HandleIdModel(id, name) {
        setTeacherInfo({ id, name });
        setShowIdModel(true);
    }

    async function getTeachersData() {
        try {

            const { data } = await axios.get('http://localhost:8080/teacher/teachers',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            setTeachersData(data);

        } catch (error) {
            console.log(error);
        }
    }
    // 2) add new teacher

    const [showAddTeacher, setShowAddTeacher] = useState(false);

    let newTeacher = {
        name: "",
        email: "",
        password: ""
    }

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    async function addTeacher(values) {

        const formData = objectToFormData(values);
        try {

            const { data } = await axios.post('http://localhost:8080/user/addTeacher', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setSuccessMsg(t("TeacherMsgSucc"));
            setTimeout(() => {
                setSuccessMsg(null)
            }, 3000);
            setReRender(reRender + 1);
        } catch (error) {
            console.log("catch error: ", error);
            setErrMsg(t("TeacherMsgErr"));
            setTimeout(() => {
                setErrMsg(null)
            }, 3000);
        }
        setShowAddTeacher(false);

    }

    const formikObjForAddTeacher = useFormik({

        initialValues: newTeacher,

        onSubmit: addTeacher
    });

    function handleCloseAddTeacher() {
        setShowAddTeacher(false);
    }

    function handleShowAddTeacher() {
        setShowAddTeacher(true);
        formikObjForAddTeacher.values.name = "";
        formikObjForAddTeacher.values.email = "";
        formikObjForAddTeacher.values.password = "";

    }

    // --------------------------------------------------------------

    // student part : ------------------------------------------

    // 1) display student
    const [studentsData, setStudentsData] = useState(null);
    const [studentInfo, setStudentInfo] = useState({
        id: 0,
        name: ""
    });
    const [showIdModelStd, setShowIdModelStd] = useState(false)

    function hideShowIdModelStd() {
        setShowIdModelStd(false);
    }

    function HandleIdModelStd(id, name) {
        setStudentInfo({ id, name });
        setShowIdModelStd(true);
    }

    async function getStudentData() {
        try {

            const { data } = await axios.get('http://localhost:8080/student/students',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            setStudentsData(data);

        } catch (error) {
            console.log(error);
        }
    }

    function setSubjectMode() {
        setSelectMode(1);
    }
    function setTeacherMode() {
        setSelectMode(2);
    }
    function setStudentMode() {
        setSelectMode(3);
    }



    function navToHome() {
        setTimeout(function () {
            navigate('/home')
        }, 100);
    }


    return (
        <>
            {/* Navbar section */}
            {/* <div className={HeaderCss.layout + " border fixed-top bg-white mb-5 p-2"}>
                <div className={HeaderCss.header + " position-sticky"}>

                    <section className={HeaderCss.flex}>

                        <Link className="fw-medium fs-4 text-dark text-decoration-none" to={'/adminHome'}>Online School</Link>
                        <div className='row'>
                            <div className='col-3'>
                                {selectMode === 1 ?
                                    <span onClick={setSubjectMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1  me-3 text-success border-bottom border-bottom-1 border-success '>Subjects </span>
                                    :
                                    <span onClick={setSubjectMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1 me-3'>Subjects </span>
                                }


                            </div>
                            <div className='col-3'>
                                {selectMode === 2 ?
                                    <span onClick={setTeacherMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium  p-1 me-3 text-success border-bottom border-bottom-1 border-success'>Teachers </span>
                                    :
                                    <span onClick={setTeacherMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1 me-3'>Teachers </span>
                                }

                            </div>
                            <div className='col-3'>
                                {selectMode === 3 ?
                                    <span onClick={setStudentMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium  p-1 me-3 text-success border-bottom border-bottom-1 border-success'>Students </span>
                                    :
                                    <span onClick={setStudentMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1 me-3'>Students </span>
                                }

                            </div>
                            <div className='col-3 text-center'>
                                <span style={{ cursor: "pointer", fontSize: "18px" }} onClick={navToHome} className='fw-medium '>LogOut <i className='fa-solid fa-arrow-right-from-bracket'></i></span>
                            </div>
                        </div>
                    </section>



                </div>
            </div> */}

            {cookies.get("i18next") === "en" ?

                <div className='container-fluid w-100 bg-light fixed-top border-bottom'>
                    <Navbar sticky="top" expand="lg" bg="light" variant="light" className="container">
                        <Navbar.Brand style={{ cursor: "pointer" }} className='fs-4 '>
                            <Link className='text-decoration-none text-dark' to={'/adminHome'}> {t("logo")}</Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >



                            <Nav className=" d-flex d-none d-lg-flex  ms-auto fs-6 w-100">
                                <Nav.Link onClick={setSubjectMode} className='ms-auto'>{t("subs")}</Nav.Link>
                                <Nav.Link onClick={setTeacherMode} >{t("teachers")}</Nav.Link>
                                <Nav.Link onClick={setStudentMode} >{t("stds")}</Nav.Link>
                                <Nav.Link onClick={navToHome}> {t("logOut")}</Nav.Link>

                            </Nav>

                            <Nav className="ml-auto d-lg-none w-100">
                                <Nav.Link onClick={setSubjectMode} >{t("subs")}</Nav.Link>
                                <Nav.Link onClick={setTeacherMode} >{t("teachers")}</Nav.Link>
                                <Nav.Link onClick={setStudentMode} >{t("stds")}</Nav.Link>
                                <Nav.Link onClick={navToHome}> {t("logOut")}</Nav.Link>


                            </Nav>


                            {/* Language dropdown for small screens */}
                            <Nav className="ml-auto d-lg-none">
                                <NavDropdown title={t("lang")} id="language-dropdown-mobile">
                                    <NavDropdown.Item onClick={() => { changeLanguage("en") }} >{t("eng")}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { changeLanguage("ar") }}>{t("ara")}</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            {/* Language dropdown for large screens */}
                            <Nav className="ml-auto d-none d-lg-block ms-auto">
                                <NavDropdown title={t("lang")} id="language-dropdown-desktop" >
                                    <NavDropdown.Item onClick={() => { changeLanguage("en") }}>{t("eng")}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { changeLanguage("ar") }}>{t("ara")}</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                :

                <div className='container-fluid w-100 bg-light fixed-top border-bottom'>
                    <Navbar sticky="top" expand="lg" bg="light" variant="light" className="container">
                        <Navbar.Brand className='fs-4'>{t("logo")}</Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className=" d-flex d-none d-lg-flex  ms-auto fs-6 w-100">
                                <Nav.Link onClick={setSubjectMode} className='me-auto'>{t("subs")}</Nav.Link>
                                <Nav.Link onClick={setTeacherMode} >{t("teachers")}</Nav.Link>
                                <Nav.Link onClick={setStudentMode} >{t("stds")}</Nav.Link>
                                <Nav.Link onClick={navToHome}> {t("logOut")}</Nav.Link>

                            </Nav>

                            <Nav className="ml-auto d-lg-none w-100">
                                <Nav.Link onClick={setSubjectMode} >{t("subs")}</Nav.Link>
                                <Nav.Link onClick={setTeacherMode} >{t("teachers")}</Nav.Link>
                                <Nav.Link onClick={setStudentMode} >{t("stds")}</Nav.Link>
                                <Nav.Link onClick={navToHome}> {t("logOut")}</Nav.Link>
                            </Nav>



                            {/* Language dropdown for small screens */}
                            <Nav className="ml-auto d-lg-none">
                                <NavDropdown title={t("lang")} id="language-dropdown-mobile">
                                    <NavDropdown.Item onClick={() => { changeLanguage("en") }} >{t("eng")}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { changeLanguage("ar") }}>{t("ara")}</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            {/* Language dropdown for large screens */}
                            <Nav className="ml-auto d-none d-lg-block me-auto">
                                <NavDropdown title={t("lang")} id="language-dropdown-desktop" >
                                    <NavDropdown.Item onClick={() => { changeLanguage("en") }}>{t("eng")}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { changeLanguage("ar") }}>{t("ara")}</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

            }
















            {/* --------------------------- */}

            {/* select mode section */}
            <div>
                {/* Subject mode section */}
                {selectMode === 1 ?
                    <>
                        {Subject === null ? <>
                            <div className='mt-5'>.</div>
                            <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                            </div>
                        </> : <>
                            <div className='mt-5'>.</div>
                            <div className=" container mt-4 mb-4 rounded-5 overflow-auto" style={{ backgroundColor: '#ecf0f3' }}>
                                <div className={SubjectCss}>
                                    <div className='text-center mt-2' >

                                        <div className={SubjectCss.headerContainer}>
                                            <h2 className={SubjectCss.customHeading + " pt-2"}>
                                            {t("subs")} 
                                            </h2>
                                        </div>


                                        <div className={SubjectCss.boxcontainer + " p-3"}>
                                            {Subject.map(function (sub, idx) {
                                                return <div key={idx}>
                                                    <div className='card rounded-4'>
                                                        <div className={SubjectCss.imageContainer + " p-5"}>
                                                            <img src={sub.pictureURL} alt={sub.title} className='w-100 card-img-top rounded-4' />
                                                        </div>
                                                        <div className='card-body'>
                                                            <h4 className='card-title fs-2'>{sub.title}</h4>

                                                            <p className='card-text fs-6 '><span className='fw-medium'>Teacher: </span> {`${teachers === null ? "" : teachers.filter(t => t.id === sub.teacher)[0].name}`}</p>
                                                            <button onClick={() => handleShow(sub.id)} className='btn btn-primary'>{t("chTeacher")} </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}

                        {/* edit subject modal */}

                        <Modal show={showEdit} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{t("chTeacher")} </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='p-3'>

                                <Form.Control onChange={formikObj.handleChange} className='d-none' type="number" value={formikObj.values.subjectId} />

                                <Form.Label className='fs-6' >{t("TeacherId")} </Form.Label>

                                <Form.Control onChange={formikObj.handleChange} value={formikObj.values.teacherId} type="number" name="teacherId" />

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


                    </>
                    // Teacher mode section
                    : selectMode === 2 ?
                        <>
                            <>
                                {teachersData === null ? <>
                                    <div className='mt-5'>.</div>
                                    <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                        <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                    </div>
                                </> : <>
                                    <div className='mt-5'>.</div>
                                    <div className=" container mt-4 mb-4 rounded-5 overflow-auto" style={{ backgroundColor: '#ecf0f3' }}>





                                        <div className={SubjectCss}>
                                            <div className='text-center mt-2' >

                                                <div className={SubjectCss.headerContainer}>
                                                    <h2 className={SubjectCss.customHeading + " pt-2"}>
                                                    {t("teachers")} 
                                                    </h2>
                                                </div>


                                                {errMsg !== null ?
                                                    <>
                                                        <div className='alert alert-danger rounded-3  m-auto w-auto text-center'>
                                                            <p className='p-0 m-0'>{errMsg}</p>
                                                        </div>
                                                    </>
                                                    :
                                                    ""
                                                }
                                                {successMsg !== null ?
                                                    <>
                                                        <div className='alert alert-success rounded-3  m-auto w-auto text-center'>
                                                            <p className='p-0 m-0'>{successMsg}</p>
                                                        </div>
                                                    </>
                                                    :
                                                    ""
                                                }

                                                <div className={SubjectCss.boxcontainer + " p-3"}>
                                                    {teachersData.map(function (tt, idx) {
                                                        return <div key={idx}>
                                                            <div className='card rounded-4'>
                                                                <div className={SubjectCss.wdArabic + " p-5"}>
                                                                    <img src={tt.personalPhoto} alt={t.name + " photo"} className='w-100 card-img-top rounded-4' />
                                                                </div>
                                                                <div className='card-body'>
                                                                    <h4 className='card-title fs-2'>{tt.name}</h4>

                                                                    <p className='card-text fs-6 '><span className='fw-medium'>Email: </span> {`${tt.email}`}</p>
                                                                    <button onClick={() => { HandleIdModel(tt.id, tt.name) }} className='btn btn-primary'>{t("ShowId")}</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    })}
                                                </div>
                                            </div>
                                            <div className='w-100 row justify-content-center pb-3'>
                                                <div className='col-4'>
                                                    <button onClick={handleShowAddTeacher} className='btn btn-success w-100 m-3 rounded-4 fs-6'>{t("addTeacher")}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>}

                                {/* Show id modal */}

                                <Modal show={showIdModel} onHide={hideShowIdModel}>
                                    <Modal.Header>
                                        <Modal.Title>{t("TeacherId")}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control value={teacherInfo.id} type="number" name="teacherId" disabled={true} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" className='m-auto' onClick={hideShowIdModel}>
                                        {t("close")}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* Add Teacher modal */}
                                <Modal show={showAddTeacher} onHide={handleCloseAddTeacher}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{t("addTeacher")}</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body className='p-3'>

                                        <Form.Label className='fs-6' >{t("teacherName")}</Form.Label>

                                        <Form.Control onChange={formikObjForAddTeacher.handleChange} value={formikObjForAddTeacher.values.name} type="text"  name="name" />

                                        <Form.Label className='fs-6' >{t("teacherEmail")}</Form.Label>

                                        <Form.Control onChange={formikObjForAddTeacher.handleChange} value={formikObjForAddTeacher.values.email} type="email"  name="email" />

                                        <Form.Label className='fs-6' >{t("TeacherPassword")}</Form.Label>

                                        <Form.Control onChange={formikObjForAddTeacher.handleChange} value={formikObjForAddTeacher.values.password} type="password" name="password" />


                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseAddTeacher}>
                                        {t("close")}
                                        </Button>
                                        <Button variant="primary" type='submit' onClick={formikObjForAddTeacher.handleSubmit} disabled={
                                            !formikObjForAddTeacher.values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
                                            formikObjForAddTeacher.values.name === "" ||
                                            formikObjForAddTeacher.values.password.length < 5
                                        } >
                                            {t("add")}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </>
                        </>

                        :
                        <>
                            <>
                                {studentsData === null ? <>
                                    <div className='mt-5'>.</div>
                                    <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                        <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                    </div>
                                </> : <>
                                    <div className='mt-5'>.</div>
                                    <div className=" container mt-4 mb-4 rounded-5 overflow-auto" style={{ backgroundColor: '#ecf0f3' }}>
                                        <div className={SubjectCss}>
                                            <div className='text-center mt-2' >

                                                <div className={SubjectCss.headerContainer}>
                                                    <h2 className={SubjectCss.customHeading + " pt-2"}>
                                                    {t("stds")}
                                                    </h2>
                                                </div>

                                                <div className={SubjectCss.boxcontainer + " p-3"}>
                                                    {studentsData.map(function (std, idx) {
                                                        return <div key={idx}>
                                                            <div className='card rounded-4'>
                                                                <div className={SubjectCss.wdArabic + " p-5"}>
                                                                    <img src={std.personalPhoto} alt={std.name + " photo"} className='w-100 card-img-top rounded-4' />
                                                                </div>
                                                                <div className='card-body'>
                                                                    <h4 className='card-title fs-2'>{std.name}</h4>

                                                                    <p className='card-text fs-6 '><span className='fw-medium'>Email: </span> {`${std.email}`}</p>
                                                                    <p className='card-text fs-6 '><span className='fw-medium'>Time Spent: </span> {`${((std.timeSpent) / 60).toFixed(2)} hours`}</p>
                                                                    <button onClick={() => { HandleIdModelStd(std.id, std.name) }} className='btn btn-primary'>{t("ShowId")}</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>}
                                {/* Show id modal */}

                                <Modal show={showIdModelStd} onHide={hideShowIdModelStd}>
                                    <Modal.Header>
                                        <Modal.Title>{t("stdId")}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control value={studentInfo.id} type="number" name="studentId" disabled={true} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" className='m-auto' onClick={hideShowIdModelStd}>
                                        {t("close")}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        </>
                }

            </div>
        </>
    )
}
