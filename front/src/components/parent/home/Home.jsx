import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HeaderCss from '../../header/header.module.css'
import SubjectCss from '../../subject/subjext.module.css'
import LessonCss from '../../lesson/Lesson.module.css'
import UnitCss from '../../units/units.module.css'
import ParentCss from '../home/parentHome.module.css'
import ReactPlayer from 'react-player'
import axios from 'axios';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
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

    // For Navbar----------------------------
    const navigate = useNavigate();
    const [selectMode, setSelectMode] = useState(1);

    const [selectModeInSubject, setSelectModeInSubject] = useState(1);

    function setSubjectMode() {
        setSelectMode(1);
    }
    function setStudentMode() {
        setSelectMode(2);
        setGradesMode(0);
    }

    function logOut() {


        localStorage.removeItem("userEmail");
        localStorage.removeItem("tkn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("subPhoto");
        setTimeout(function () {
            navigate('/home')
        }, 100);
    }

    useEffect(() => {
        getSubjects();
        getParentByEmail();
    }, [])

    //------------------------------------------------------

    //Dispaly subject part --------------------------------
    const [Subject, setSubject] = useState(null);
    const [subName, setSubjectName] = useState(null);
    const [teacherName, setTeacherName] = useState(null);
    const [subjectId, setSubjectId] = useState(null);

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

    async function getTeacherName(teacherId) {

        try {

            const { data } = await axios.get('http://localhost:8080/teacher/teachers',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                    }
                });
            const selectTeacher = data.filter(data => data.id === teacherId);
            setTeacherName(selectTeacher[0].name);

        } catch (error) {
            console.log(error);
        }




    }

    function openUnits(subId, subName, teacherId, subPhoto) {
        localStorage.setItem("subPhoto", subPhoto);
        getUnits(subId);
        setSubjectName(subName);
        setSubjectId(subId);
        getTeacherName(teacherId);
        setSelectModeInSubject(2);
    }

    //Dispaly unit part ---------------------------------

    const [unit, setUnit] = useState(null);
    const [unitName, setUnitName] = useState(null);
    const [unitNumber, setUnitNumber] = useState(null);

    async function getUnits(subId) {
        try {
            const { data } = await axios.get('http://localhost:8080/subject/subjectUnites/' + subId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setUnit(data);

        } catch (error) {
            console.log(error);
        }

    }
    function backToSubjects() {

        setSelectModeInSubject(1);
    }

    function openLessons(subjectId, unitNumber, unitName) {
        getLessons(subjectId, unitNumber);
        setUnitNumber(unitNumber);
        setUnitName(unitName);
        setSelectModeInSubject(3);
    }


    //Dispaly lesson part  --------------------------------
    const [lesson, setLesson] = useState(null)
    const [lessonName, setLessonName] = useState(null);


    async function getLessons(subId, unitNumber) {
        try {

            const { data } = await axios.get('http://localhost:8080/lesson/uniteLessons/' + subId + "/" + unitNumber, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setLesson(data);


        } catch (error) {
            console.log(error);
        }

    }

    function backToUnits() {

        setSelectModeInSubject(2);
    }

    function OpenLessonExplanation(lessonNumber, lessonName) {
        setLessonName(lessonName);
        getLessonsExplanation(subjectId, unitNumber, lessonNumber)
        setSelectModeInSubject(4);
    }


    //Dispaly lesson explanation part  --------------------------------

    const [selectModeInLessonExplanation, setselectModeInLessonExplanation] = useState(1);
    const [lessonContent, setLessonContent] = useState(null);

    function checkMode(mode) {
        setselectModeInLessonExplanation(mode);
    }

    async function getLessonsExplanation(subId, unitNumber, lessonNumber) {
        try {
            const { data } = await axios.get('http://localhost:8080/lesson/getOneLesson/' + subId + "/" + unitNumber + "/" + lessonNumber, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setLessonContent(data);
        } catch (error) {
            console.log(error);
        }
    }

    function backToLessons() {

        setSelectModeInSubject(3);
    }


    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------


    // Students of parent 

    const [students, setStudents] = useState(null)
    const [parentId, setParentId] = useState(null);
    const [parent, setParent] = useState(null);
    const [subjectGrades, setSubjectGrades] = useState(null);
    const [unitGrades, setUnitGrades] = useState(null);
    const [lessonsGrades, setLessonsGrades] = useState(null);
    const [subbId, setSubbId] = useState(null);
    const [stddId, setStddId] = useState(null);
    const [gradesMode, setGradesMode] = useState(0);


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
            setParentId(data.id);
            setParent(data);

        } catch (error) {
            console.log("catch error: ", error);
        }


    }

    async function getStudents() {
        try {
            const { data } = await axios.get('http://localhost:8080/parent/getOneParent/' + parentId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setStudents(data.student);
        } catch (error) {
            console.log(error);
        }
    }

    const [childId, setChildId] = useState(null)

    async function getFinalGrades(stdId) {
        setChildId(stdId);
        try {
            const { data } = await axios.get('http://localhost:8080/FinalTest/getStudentTestGrads/' + stdId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            console.log(stdId);
            console.log(localStorage.getItem("tkn"));
            setSubjectGrades(data);
            setGradesMode(1);
            setStddId(stdId);

        } catch (error) {
            console.log(error);
        }
    }
    function backToStudentsInfo() {
        setGradesMode(0);
    }

    async function getUnitGrades(stdId, subId) {
        console.log(stdId, subId);
        try {
            const { data } = await axios.get('http://localhost:8080/solve/getUnitesGrades/' + stdId + "/" + subId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setUnitGrades(data);
            setSubbId(subId);
            setGradesMode(2);
        } catch (error) {
            console.log(error);
        }
    }
    async function getLessonGrades(unitId) {
        try {
            const { data } = await axios.get('http://localhost:8080/solve/getLessonsGrades/' + stddId + "/" + subbId + "/" + unitId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
            setLessonsGrades(data);
            setGradesMode(3);
        } catch (error) {
            console.log(error);
        }
    }

    function backToSubjectsGrades() {
        setGradesMode(1);
    }

    function backToUnitsGrades() {
        setGradesMode(2);
    }


    function navToParentProfile() {
        setTimeout(() => {
            navigate('/parentProfile')
        }, 100);
    }





    return (
        <>
            {/* Navbar section */}

            {/* <div className={HeaderCss.layout + " border fixed-top bg-white mb-5 p-2"}>
                <div className={HeaderCss.header + " position-sticky"}>

                    <section className={HeaderCss.flex}>

                        <Link className="fw-medium fs-4 text-dark text-decoration-none" to={'/parentHome'}>Online School</Link>

                        <div >
                            <div onClick={navToParentProfile} style={{ cursor: "pointer" }} className='d-flex justify-content-centerd-flex justify-content-center align-items-center ps-5'>

                                <div className='pt-2 ms-2'><p className="fw-medium fs-5 pt-2 ps-5">{parent !== null ? parent.name : ""}</p></div>
                                <div style={{ width: "40px", height: "40px" }} className={HeaderCss.photo + " ms-2"}>
                                    <img src={require('../../../images/userr.png')} className=' img-fluid rounded-circle' alt="" />
                                </div>

                            </div>
                        </div>

                        <div className='row text-center'>
                            <div className='col-md-4'>
                                {selectMode === 1 ?
                                    <span onClick={setSubjectMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1  me-3 text-success border-bottom border-bottom-1 border-success '>Subjects </span>
                                    :
                                    <span onClick={setSubjectMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1 me-3'>Subjects </span>
                                }


                            </div>
                            <div className='col-md-4' onClick={getStudents}>
                                {selectMode === 2 ?
                                    <span onClick={setStudentMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium  p-1 me-3 text-success border-bottom border-bottom-1 border-success'>Children </span>
                                    :
                                    <span onClick={setStudentMode} style={{ cursor: "pointer", fontSize: "18px" }} className='fw-medium p-1 me-3'>Children </span>
                                }

                            </div>
                            <div className='col-md-4'>
                                <span style={{ cursor: "pointer", fontSize: "18px" }} onClick={logOut} className='fw-medium p-1'>LogOut <i className='fa-solid fa-arrow-right-from-bracket'></i></span>
                            </div>
                        </div>

                    </section>



                </div>
            </div> */}

            {cookies.get("i18next") === "en" ?

                <div className='container-fluid w-100 bg-light fixed-top border-bottom'>
                    <Navbar sticky="top" expand="lg" bg="light" variant="light" className="container">
                        <Navbar.Brand style={{ cursor: "pointer" }} className='fs-4 '>
                            <Link className='text-decoration-none text-dark' to={'/parentHome'}> {t("logo")}</Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >



                            <Nav className=" d-flex d-none d-lg-flex  ms-auto fs-6 w-100">
                                <Nav.Link onClick={navToParentProfile} className='ms-auto' >{t("profile")}</Nav.Link>
                                <Nav.Link onClick={setSubjectMode} >{t("subs")}</Nav.Link>
                                <div onClick={getStudents}><Nav.Link onClick={setStudentMode} >{t("child")}</Nav.Link></div>
                                <Nav.Link onClick={logOut}> {t("logOut")}</Nav.Link>

                            </Nav>

                            <Nav className="ml-auto d-lg-none w-100">
                                <Nav.Link onClick={navToParentProfile}>{t("profile")}</Nav.Link>
                                <Nav.Link onClick={setSubjectMode} >{t("subs")}</Nav.Link>
                                <div onClick={getStudents}><Nav.Link onClick={setStudentMode} >{t("child")}</Nav.Link></div>
                                <Nav.Link onClick={logOut}>{t("logOut")}</Nav.Link>

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
                                <Nav.Link onClick={navToParentProfile} className='me-auto' >{t("profile")}</Nav.Link>
                                <Nav.Link onClick={setSubjectMode}  >{t("subs")}</Nav.Link>
                                <div onClick={getStudents}><Nav.Link onClick={setStudentMode}  >{t("child")}</Nav.Link></div>
                                <Nav.Link onClick={logOut} >{t("logOut")}</Nav.Link>

                            </Nav>

                            <Nav className="ml-auto d-lg-none w-100">
                                <Nav.Link onClick={navToParentProfile}>{t("profile")}</Nav.Link>
                                <Nav.Link onClick={setSubjectMode}  >{t("subs")}</Nav.Link>
                                <div onClick={getStudents}><Nav.Link onClick={setStudentMode}  >{t("child")}</Nav.Link></div>
                                <Nav.Link onClick={logOut}>{t("logOut")}</Nav.Link>

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







            <div className='mt-5'>.</div>
            <div className=''>.</div>


            <div className=" w-75 m-auto mt-3 rounded-5 pb-3" style={{ backgroundColor: '#ecf0f3' }}>
                <div className=' w-100 h-100 '>

                    {selectMode === 1 ?
                        <>
                            {selectModeInSubject === 1 ?
                                <>
                                    {Subject === null ? <>
                                        <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                            <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                        </div>
                                    </> : <>
                                        <div className=" container mt-4 mb-4 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
                                            <div className={SubjectCss}>
                                                <div className='text-center overflow-auto' >


                                                    <div className={SubjectCss.headerContainer}>
                                                        <h2 className={SubjectCss.customHeading + " pt-2"}>
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
                                                                        <div className='col-11'>
                                                                            <button onClick={() => { openUnits(sub.id, sub.title, sub.teacher, sub.pictureURL) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                                                                        </div>
                                                                    </div>

                                                                    <div className='row justify-content-center m-1'>
                                                                        <div className='col-11'>
                                                                            <a style={{ width: "100%" }} href={sub.contentOfFirstTerm} target="_blank" rel="Interactive content of first term">
                                                                                <button className='btn btn-success w-100'>{t("firstTermBtn")}</button>
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    <div className='row justify-content-center m-1'>
                                                                        <div className='col-11'>
                                                                            <a style={{ width: "100%" }} className='btn btn-success' href={sub.contentOfSecondTeam} target="_blank" rel="Interactive content of Second term">
                                                                                {t("secondTermBtn")}
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
                                : selectModeInSubject === 2 ?
                                    <>

                                        {unit === null ? <>
                                            <div style={{ backgroundColor: '#ecf0f3' }} className='w-100 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                                <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>

                                            </div>
                                        </> : <>
                                            <div className=" w-100 m-auto mt-3 pb-3 mb-3 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
                                                <div className=' w-100 overflow-auto'>

                                                    {/* //Sub Name & Teacher Name */}
                                                    {/* <div className='d-flex justify-content-between w-100 pt-3'>

                                                        <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center ms-5 '>

                                                            <div className={UnitCss.user + " "}>
                                                                <img src={require('../../../images/userr.png')} className='w-100' alt="teacher photo" />
                                                            </div>
                                                            <div className='pt-2'>
                                                                <p className={UnitCss.bold + " pt-2"}>  {teacherName} </p>
                                                            </div>

                                                        </div>

                                                        <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center me-5'>

                                                            <div className=' me-2'><p className={UnitCss.bold + " pt-2"}>{subName}</p></div>
                                                            <div className={UnitCss.user + " "}>
                                                                <img src={localStorage.getItem('subPhoto')} className='w-100 img-fluid rounded-circle' alt="subject photo" />
                                                            </div>
                                                        </div>



                                                    </div> */}

                                                    <div className={UnitCss.container + " mt-3"}>
                                                        <div className={UnitCss.infoSection}>
                                                            <div className={UnitCss.userImage}>
                                                                <img src={require('../../../images/userr.png')} className="img-fluid" alt="teacher photo" />
                                                            </div>
                                                            <p className="text pt-3">{teacherName}</p>
                                                        </div>

                                                        <div className={UnitCss.infoSection + " pt-2"}>
                                                            <p className={UnitCss.text + " pb-3 me-2"}>{subName}</p>
                                                            <div className={UnitCss.userImage}>
                                                                <img src={localStorage.getItem('subPhoto')} className="img-fluid" alt="subject photo" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* first or second term ?

                                                    <div className='d-flex justify-content-center m-4 '>
                                                        <select className="form-select w-75" aria-label="Disabled select example" >
                                                            <option value="default">First Term</option>
                                                            <option value="1">Second Term</option>
                                                        </select>
                                                    </div> */}

                                                    {/* Units */}

                                                    {unit.map(function (unit, idx) {
                                                        return <div key={idx}>
                                                            <div className='text-dark card w-75 m-auto mt-3  rounded-3 p-2'>
                                                                <div className='card body p-2 text-center'>
                                                                    <h4 className='card-title'>{unit.title}</h4>
                                                                    <p className='card-text'>{unit.description}</p>
                                                                    <div className='text-center  row justify-content-center'>
                                                                        <div className="col-3">
                                                                            <button onClick={() => { openLessons(unit.subjectId, unit.number, unit.title) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    })}

                                                    <div className='w-100 row justify-content-center'>
                                                        <div className='col-6 '>
                                                            <button onClick={backToSubjects} className='w-100 btn btn-primary m-3 rounded-4 fs-6'>{t("backToSubjects")}</button>
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </>}

                                    </>
                                    : selectModeInSubject === 3 ?
                                        <>

                                            {lesson === null ? <>
                                                <div style={{ backgroundColor: '#ecf0f3' }} className='w-100 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                                    <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                                                </div>
                                            </> : <>
                                                <div className=" w-100 m-auto mt-3 rounded-5 pb-3" style={{ backgroundColor: '#ecf0f3' }}>
                                                    <div className=' w-100 overflow-auto'>

                                                        {/* Lesson Name & Teacher Name */}
                                                        {/* <div className='d-flex justify-content-between w-100 pt-3'>

                                                            <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center ms-5 '>

                                                                <div className={LessonCss.user + " "}>
                                                                    <img src={require('../../../images/userr.png')} className='w-100' alt="teacher photo" />
                                                                </div>
                                                                <div className='pt-2'><p className={LessonCss.bold + " pt-2"}>{teacherName}</p></div>

                                                            </div>

                                                            <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center me-5'>

                                                                <div className='pt-2'><p className={LessonCss.bold + " pt-2"}>{unitName}</p></div>

                                                            </div>



                                                        </div> */}


                                                        <div className={UnitCss.container + " mt-3"}>
                                                            <div className={UnitCss.infoSection}>
                                                                <div className={UnitCss.userImage}>
                                                                    <img src={require('../../../images/userr.png')} className="img-fluid" alt="teacher photo" />
                                                                </div>
                                                                <p className="text pt-3">{teacherName}</p>
                                                            </div>

                                                            <div className={UnitCss.infoSection + " pt-2"}>
                                                                <p className={UnitCss.text + " pb-3 me-2"}>{subName}</p>

                                                            </div>
                                                        </div>

                                                        {/* lessons */}


                                                        {lesson.map(function (lesson, idx) {
                                                            return <div key={idx}>
                                                                <div className='text-dark card w-75 m-auto mt-3  rounded-3 p-2'>
                                                                    <div className='card body p-2'>
                                                                        <h4 className='card-title text-center'>{lesson.title}</h4>
                                                                        <div className='text-center mt-3 row justify-content-center'>
                                                                            <div className="col-3">
                                                                                <button onClick={() => { OpenLessonExplanation(lesson.number, lesson.title) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        })}

                                                        <div className='w-100 row justify-content-center'>
                                                            <div className='col-6 '>
                                                                <button onClick={backToUnits} className='w-100 btn btn-primary m-3 rounded-4 fs-6'>{t("backToUnits")}</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>}

                                        </>

                                        :

                                        <>
                                            <div className='w-100 m-auto text-center mt-3 overflow-auto'>

                                                <div className={SubjectCss.headerContainer}>
                                                    <h2 className={SubjectCss.customHeading + " pt-2"}>
                                                        {lessonName}
                                                    </h2>
                                                </div>


                                            </div>

                                            {/* select mode in lesson expalantion  (Video  , explanation) */}
                                            <div className='w-75 m-auto'>
                                                <div className='row w-100 m-auto mt-4 justify-content-center'>
                                                    <div className='col-lg-6 col-sm-12 mt-1'>
                                                        <button onClick={() => checkMode(1)} className='btn btn-danger w-100 rounded-4'>{t("video")} <i className='fa-solid fa-play ms-1'></i></button>
                                                    </div>
                                                    <div className='col-lg-6 col-sm-12 mt-1'>
                                                        <button onClick={() => checkMode(2)} className='btn btn-success w-100 rounded-4'>{t("exp")}  <i className='fa-solid fa-chalkboard-user ms-1'></i> </button>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=" w-100 m-auto mt-3 pb-3 mb-1 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
                                                {/* the mode which the student selected */}
                                                <div>
                                                    {selectModeInLessonExplanation === 1 ?
                                                        // video part
                                                        <>
                                                            <div>
                                                                {lessonContent === null ?
                                                                    <>
                                                                        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                                                            <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                                                                        </div></>
                                                                    : <div className='w-100 p-4 '>
                                                                        <ReactPlayer className="w-75 vh-75 m-auto" url={lessonContent.video_url} controls={true} />
                                                                    </div>}
                                                            </div>
                                                            <div className='w-100 row justify-content-center'>
                                                                <div className='col-6 '>
                                                                    <button onClick={backToLessons} className='w-100 btn btn-primary m-1 rounded-4 fs-6'>{t("backToLessons")}</button>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        // explanation part
                                                        <>
                                                            <div>
                                                                {lessonContent === null ?
                                                                    <>
                                                                        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
                                                                            <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>
                                                                        </div></>
                                                                    : <div className='p-4'>

                                                                        {lessonContent.pictureUrl.map(function (les, idx) {
                                                                            return (
                                                                                <div key={idx}>
                                                                                    <div className='card rounded-4 mt-2'>
                                                                                        <div className='card-body'>
                                                                                            <div className='row'>
                                                                                                {/* image */}
                                                                                                <div className='col-lg-5 mt-1'>
                                                                                                    <div className='w-100'>
                                                                                                        <img src={les} className='w-100' alt={lessonContent.title + " image " + (idx + 1)} />
                                                                                                    </div>
                                                                                                </div>
                                                                                                {/* explain the image */}
                                                                                                <div className='col-lg-7 mt-1'>
                                                                                                    <div className='w-100 h-100 d-flex justify-content-center align-items-center fs-5'>
                                                                                                        <p>{lessonContent.explantions[idx]}</p>
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
                                                    }
                                                </div>
                                            </div>

                                        </>




                            }
                        </>
                        :
                        <>

                            <>
                                {students === null ? <>
                                    <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                        <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                    </div>
                                </> :

                                    <>
                                        {gradesMode === 0 ?
                                            <>
                                                <div className=" container mt-4 mb-4 rounded-5 pt-3" style={{ backgroundColor: '#ecf0f3' }}>
                                                    <div className={SubjectCss}>
                                                        <div className='text-center' >
                                                            <div className={SubjectCss.boxcontainer + " p-3"}>
                                                                {students.map(function (std, idx) {
                                                                    return <div key={idx}>
                                                                        <div className='card rounded-4'>
                                                                            <div className={SubjectCss.wdArabic + " p-5"}>
                                                                                <img src={std.personalPhoto} alt={std.name} className='w-100 card-img-top rounded-4' />
                                                                            </div>
                                                                            <div className='card-body'>
                                                                                <h4 className='card-title fs-2'>{std.name}</h4>

                                                                                <p className='card-text fs-6 '><span className='fw-medium'>Email: </span> {`${std.email}`}</p>
                                                                                <button onClick={() => { getFinalGrades(std.id) }} className='btn btn-primary'>{t("stdGrades")}</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                })}


                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                            : gradesMode === 1 ?
                                                // subject grades
                                                <>

                                                    {subjectGrades === null ? <>
                                                        <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                                            <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                                        </div></>
                                                        :
                                                        <>
                                                            {subjectGrades.length === 0 ?

                                                                <div>

<div className=" container mt-4 mb-4 rounded-5 pt-3" style={{ backgroundColor: '#ecf0f3' }}>
                                                                <div>
                                                                    <div>
                                                                        <div className={ParentCss.boxcontainer + " p-3"}>
                                                                            {Subject.map(function (sub, idx) {
                                                                                return <div key={idx}>
                                                                                    <div className='card rounded-4 '>
                                                                                        <div className='card-body'>
                                                                                            <div className='d-flex justify-content-between p-4'>
                                                                                                <h3>{sub.title}</h3>

                                                                                                <p className='fs-5 text-danger'>{t("passed")}</p>
                                                                                                

                                                                                            </div>
                                                                                            <div onClick={() => { getUnitGrades(childId, sub.id) }} className='text-center' >
                                                                                                <button className='btn btn-primary w-25 fs-5'>{t("unitGrades")}</button>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            })}

                                                                            <div className='w-100 text-center'>
                                                                                <button onClick={backToStudentsInfo} className='btn btn-success w-25 fs-5 '>{t("back")}</button>
                                                                            </div>


                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                                </div> :

                                                                <div>
                                                                    <div className=" container mt-4 mb-4 rounded-5 pt-3" style={{ backgroundColor: '#ecf0f3' }}>
                                                                        <div>
                                                                            <div>
                                                                                <div className={ParentCss.boxcontainer + " p-3"}>
                                                                                    {subjectGrades.map(function (sub, idx) {
                                                                                        return <div key={idx}>
                                                                                            <div className='card rounded-4 '>
                                                                                                <div className='card-body'>
                                                                                                    <div className='d-flex justify-content-between p-4'>
                                                                                                        <h3>{sub.finalTestKey.subjectTitle}</h3>

                                                                                                        {Subject === null ? "" : <>
                                                                                                            {sub.grade < Subject[0].finalQuestionAnswer.length / 2 ?
                                                                                                                <h5 className='fs-5 text-danger'>{`${t("grade")} ${sub.grade} (${((sub.grade / Subject[0].finalQuestionAnswer.length) * 100).toFixed(2)}%)`}</h5>
                                                                                                                :
                                                                                                                <h5 className='fs-5 text-success'>{`${t("grade")} ${sub.grade} (${((sub.grade / Subject[0].finalQuestionAnswer.length) * 100).toFixed(2)}%)`}</h5>
                                                                                                            }

                                                                                                        </>
                                                                                                        }

                                                                                                    </div>
                                                                                                    <div onClick={() => { getUnitGrades(sub.finalTestKey.studentNumber, sub.finalTestKey.subjectNumber) }} className='text-center' >
                                                                                                        <button className='btn btn-primary w-25 fs-5'>{t("unitGrades")}</button>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    })}

                                                                                    <div className='w-100 text-center'>
                                                                                        <button onClick={backToStudentsInfo} className='btn btn-success w-25 fs-5 '>{t("back")}</button>
                                                                                    </div>


                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>}
                                                        </>

                                                    }

                                                </>
                                                // unit grades
                                                : gradesMode === 2 ?
                                                    <>
                                                        <>

                                                            {unitGrades === null ? <>
                                                                <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                                                    <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                                                </div></>
                                                                :
                                                                <>
                                                                    <div className=" container mt-4 mb-4 rounded-5 pt-3" style={{ backgroundColor: '#ecf0f3' }}>
                                                                        <div>
                                                                            <div>
                                                                                <div className={ParentCss.boxcontainer + " p-3"}>
                                                                                    {unitGrades.map(function (unit, idx) {
                                                                                        return <div key={idx}>
                                                                                            <div className='card rounded-4 '>
                                                                                                <div className='card-body'>
                                                                                                    <div className='d-flex justify-content-between p-4'>
                                                                                                        <h3>{unit.UniteTitle}</h3>
                                                                                                        {unit.Grade < unit.QuestionNumber / 2 || unit.QuestionNumber === 0 ?
                                                                                                            <h5 className='fs-5 text-danger'>{`${t("grade")} ${unit.Grade} [${unit.Grade} ${t("out")} ${unit.QuestionNumber} (${(unit.QuestionNumber === 0 ? 0 : (unit.Grade / unit.QuestionNumber) * 100).toFixed(2)}%)]`}</h5>
                                                                                                            :
                                                                                                            <h5 className='fs-5 text-success'>{`${t("grade")} ${unit.Grade} [${unit.Grade} ${t("out")} ${unit.QuestionNumber}(${((unit.Grade / unit.QuestionNumber) * 100).toFixed(2)}%)]`}</h5>
                                                                                                        }
                                                                                                    </div>
                                                                                                    <div onClick={() => { getLessonGrades(unit.UniteNumber) }} className='text-center' >
                                                                                                        <button className='btn btn-primary w-25 fs-5'>{t("lessonGrades")}</button>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    })}

                                                                                    <div className='w-100 text-center'>
                                                                                        <button onClick={backToSubjectsGrades} className='btn btn-success w-25 fs-5 '>{t("back")}</button>
                                                                                    </div>


                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </>

                                                            }

                                                        </>
                                                    </>
                                                    :
                                                    <>
                                                        {/* lessons grades */}


                                                        <>

                                                            {lessonsGrades === null ? <>
                                                                <div style={{ backgroundColor: '#ecf0f3' }} className='container mt-4 mb-4 rounded-5  vh-100 d-flex justify-content-center align-items-center' >
                                                                    <i className='fa-solid fa-spin fa-7x text-white fa-spinner  '></i>

                                                                </div></>
                                                                :
                                                                <>
                                                                    <div className=" container mt-4 mb-4 rounded-5 pt-3" style={{ backgroundColor: '#ecf0f3' }}>
                                                                        <div>
                                                                            <div>
                                                                                <div className={ParentCss.boxcontainer + " p-3"}>
                                                                                    {lessonsGrades.map(function (les, idx) {
                                                                                        return <div key={idx}>
                                                                                            <div className='card rounded-4 '>
                                                                                                <div className='card-body'>
                                                                                                    <div className='d-flex justify-content-between p-4'>
                                                                                                        <h3>{les.lessonTitle}</h3>
                                                                                                        {
                                                                                                            les.Grade < les.QuestionNumber / 2 || les.QuestionNumber === 0 ?
                                                                                                                <h5 className='fs-5 text-danger'>{`${t("grade")} ${les.Grade}  [ ${les.Grade} ${t("out")} ${les.QuestionNumber} (${(les.QuestionNumber === 0 ? 0 : (les.Grade / les.QuestionNumber) * 100).toFixed(2)}%) ]`}</h5>
                                                                                                                :
                                                                                                                <h5 className='fs-5 text-success'>{`${t("grade")} ${les.Grade} [ ${les.Grade} ${t("out")} ${les.QuestionNumber} (${((les.Grade / les.QuestionNumber) * 100).toFixed(2)}%) ]`}</h5>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    })}

                                                                                    <div className='w-100 text-center'>
                                                                                        <button onClick={backToUnitsGrades} className='btn btn-success w-25 fs-5 '>{t("back")}</button>
                                                                                    </div>


                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </>

                                                            }

                                                        </>

                                                    </>


                                        }
                                    </>


                                }
                            </>

                        </>

                    }
                </div>
            </div >



        </>
    )
}



