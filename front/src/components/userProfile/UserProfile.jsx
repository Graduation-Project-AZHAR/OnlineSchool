// src/components/UserProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"
import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';

const UserProfile = ({ name, personalPhoto, email }) => {
    const { t, i18n } = useTranslation();
    const lng = cookies.get("i18next") || "en";

    useEffect(() => {
        window.document.dir = i18n.dir();

    }, [lng])

    const changeLanguage = (lang) => {

        i18n.changeLanguage(lang);
    };

    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        margin: 0,
        padding: '20px',
    };

    const userProfileStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px',
        width: '100%',
        transition: 'transform 0.3s',
        textAlign: 'center',
    };

    const profilePhotoStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '20px',
    };

    const profileDetailsStyle = {
        textAlign: 'center',
    };

    const nameStyle = {
        margin: 0,
        fontSize: '2rem',
        color: '#333',
    };

    const emailStyle = {
        margin: '10px 0 0',
        fontSize: '1.2rem',
        color: '#777',
    };

    const mediaQueryStyle = `
    @media (max-width: 600px) {
      .userProfile {
        padding: 20px;
        width: 90%;
      }

      .profilePhoto {
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
      }

      .name {
        font-size: 1.5rem;
      }

      .email {
        font-size: 1rem;
      }
    }
  `;

    const buttonStyle1 = {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonStyle2 = {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const navigate = useNavigate();

    function back() {
        if (localStorage.getItem("userRole") === "STUDENT") {
            setTimeout(() => {
                navigate("/subject")
            }, 100);
        }
        else if (localStorage.getItem("userRole") === "PARENT") {
            setTimeout(() => {
                navigate("/parentHome")
            }, 100);
        }
        else if (localStorage.getItem("userRole") === "TEACHER") {
            setTimeout(() => {
                navigate("/teacherHome")
            }, 100);
        }

    }


    const [reRender, setReRender] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState(name);

    let user = {
        name: "",
        email: "",
        password: "",
        newPassword: "",
        personalPhoto: ""
    }

    const objectToFormData = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        return formData;
    };


    async function editProfile(values) {
        console.log(values);

        const formData = objectToFormData(values);

        try {
            const { data } = await axios.put('http://localhost:8080/user/updateUser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")

                }
            });

            setSuccessMsg(t("userSucc"));
            setTimeout(() => {
                setSuccessMsg(null)
            }, 2500);

        } catch (error) {
            console.log("catch error: ", error);
            setErrMsg(t("userErr"));
            setTimeout(() => {
                setErrMsg(null)
            }, 2500);
        }

        setReRender(reRender + 1);
        setShowEdit(false);
    }
    useEffect(() => {
        getUserByEmail();
    }, [reRender]);

    useEffect(() => {
        if (userData)
            setUserName(userData.name);
    }, [userData]);

    const formikObj = useFormik({

        initialValues: user,

        onSubmit: editProfile
    });

    function handleClose() {
        setShowEdit(false);
    }

    function handleShow() {
        setShowEdit(true);
        formikObj.values.name = "";
        formikObj.values.email = localStorage.getItem("userEmail");
        formikObj.values.password = '';
        formikObj.values.newPassword = '';
        formikObj.values.personalPhoto = '';

    }



    async function getUserByEmail() {
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
            setUserData(data);

        } catch (error) {
            console.log(error);
        }
    }








    return (

        <>
            {cookies.get("i18next") === "en" ?

                <div className='container-fluid w-100 bg-light fixed-top border-bottom'>
                    <Navbar sticky="top" expand="lg" bg="light" variant="light" className="container">
                        <Navbar.Brand className='fs-4'>{t("logo")}</Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

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

            {errMsg !== null ?
                <>
                    <div className=' mt-5'>.</div>
                    <div className='alert alert-danger rounded-3  m-auto  text-center w-25 mt-5'>
                        <p className='p-0 m-0'>{errMsg}</p>
                    </div>
                </>
                :
                ""
            }
            {successMsg !== null ?
                <>
                    <div className=' mt-5'>.</div>
                    <div className='alert alert-success rounded-3  m-auto text-center w-25 mt-5'>
                        <p className='p-0 m-0'>{successMsg}</p>
                    </div>
                </>
                :
                ""
            }



            <div style={containerStyle}>

                {userData === null ? "" :

                    <>
                        <style>{mediaQueryStyle}</style>
                        <div className="userProfile" style={userProfileStyle}>
                            <img src={userData.personalPhoto} alt={`${name}'s profile`} style={profilePhotoStyle} />
                            <div style={profileDetailsStyle}>
                                <h2 className="name" style={nameStyle}>{userName}</h2>
                                <p className="email" style={emailStyle}>{email}</p>

                                <div className='row justify-content-between'>

                                    <div className="col-6">
                                        <button onClick={back} style={buttonStyle1}>
                                            {t("back")}
                                        </button>
                                    </div>

                                    <div className="col-6">
                                        <button onClick={handleShow} className='bg-success' style={buttonStyle2}>
                                            {t("edit")}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                }
            </div>






            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("edit")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-3'>

                    <Form.Control onChange={formikObj.handleChange} className='d-none' type="number" value={formikObj.values.email} />

                    <Form.Label className='fs-6' >{t("SignUpName")}</Form.Label>

                    <Form.Control onChange={formikObj.handleChange} value={formikObj.values.name} type="text" name="name" />

                    <Form.Label className='fs-6 mt-3' >{t("personalPic")}</Form.Label>
                    <Form.Control onChange={formikObj.handleChange} value={formikObj.values.personalPhoto} type="text" name="personalPhoto" />

                    <Form.Label className='fs-6' >{t("password")}</Form.Label>

                    <Form.Control onChange={formikObj.handleChange} value={formikObj.values.password} type="password" name="password" />

                    <Form.Label className='fs-6' >{t("newPassword")}</Form.Label>

                    <Form.Control onChange={formikObj.handleChange} value={formikObj.values.newPassword} type="password" name="newPassword" />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("close")}
                    </Button>
                    <Button variant="primary" type='submit' onClick={formikObj.handleSubmit} disabled={
                        formikObj.values.name.length < 3 ||
                        formikObj.values.password.length < 5 ||
                        formikObj.values.newPassword.length < 5 ||
                        !formikObj.values.personalPhoto.match(/https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)/)
                    } >
                        {t("edit")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserProfile;
