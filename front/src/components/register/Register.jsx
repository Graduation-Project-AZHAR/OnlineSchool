
import React, { useState } from 'react'
import { useFormik } from 'formik'
import RegisterCss from '../register/register.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"


export default function Register() {

  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();

  }, [lng])

  const changeLanguage = (lang) => {

    i18n.changeLanguage(lang);
  };







  const [selectMode, setSelectMode] = useState(1);

  const [emailExistFlag, setEmailExistFlag] = useState(null)
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();
  function setStudentMode() {
    setSelectMode(1);
  }
  function setParentMode() {
    setSelectMode(2);
  }

  const objectToFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return formData;
  };

  async function sendStudentDate(values) {
    try {


      let std = {
        name: values.name,
        email: values.email,
        password: values.password,
        parent_email: values.parent_email
      }
      const formData = objectToFormData(std);
      const { data } = await axios.post('http://localhost:8080/user/api/StudentSignUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);
      setEmailExistFlag(false);
      setErrMsg(t("SignUpSucc"))

      setTimeout(() => {
        navigate("/login")
      }, 1000);

    } catch (error) {
      setErrMsg(t("SignUpErr"));
      setEmailExistFlag(true);

    }

  }

  async function sendParentDate(values) {
    try {
      let par = {
        name: values.name,
        email: values.email,
        password: values.password
      }
      const formData = objectToFormData(par);
      const { data } = await axios.post('http://localhost:8080/user/api/ParentSignUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);
      setEmailExistFlag(false);
      setErrMsg(t("SignUpSucc"))

      setTimeout(() => {
        navigate("/login")
      }, 1000);

    } catch (error) {
      setErrMsg(t("SignUpErr"));
      setEmailExistFlag(true);

    }

    console.log(values);
  }

  let student = {
    name: '',
    email: '',
    password: '',
    parent_email: '',
    confirmPassword: ''

  }

  let parent = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ""
  }

  //use formik library =>will map your form with object and best way for validation


  const formikObjForStudent = useFormik({
    initialValues: student,
    onSubmit: sendStudentDate,
    validate: function (values) {
      const errors = {};

      setEmailExistFlag(null);
      setErrMsg(null);

      if (values.name.length < 3 || values.name.length > 25) {
        errors.name = t("validateNameErr")
      }

      if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = t("validateEmailErr")
      }

      if (!values.parent_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.parent_email = t("validateEmailErr")
      }

      if (values.password.length < 5 || values.password.length > 12) {
        errors.password = t("validatePasswordErr")
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = t("conPasswordErr")
      }
      return errors;
    }


  });


  const formikObjForParent = useFormik({
    initialValues: parent,
    onSubmit: sendParentDate,
    validate: function (values) {
      const errors = {};
      setEmailExistFlag(null);
      setErrMsg(null);

      if (values.name.length < 3 || values.name.length > 12) {
        errors.name = t("validateNameErr")
      }

      if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = t("validateEmailErr")
      }

      if (values.password.length < 5 || values.password.length > 12) {
        errors.password = t("validatePasswordErr")
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = t("conPasswordErr")
      }
      return errors;
    }


  });


  function NavToHome() {
    navigate('/home')
  }

  return <>



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

    <div className='mt-2'>.</div>
    <div className={RegisterCss.over + ""}>
      <div className={RegisterCss.bodyy + " mt-5 "}>
        <div className={RegisterCss.containerr + ' w-50 py-5 '}>

          <div className='w-75 m-auto d-flex justify-content-center align-items-center fs-4 '>

            {selectMode === 1 ?
              <div style={{ cursor: "pointer" }} className='w-50 text-center fw-bold text -primary '>
                <p onClick={setStudentMode} className='bg-primary rounded-2 text-white'>{t("std")}</p>
              </div>
              :
              <div style={{ cursor: "pointer" }} className='w-50 text-center '>
                <p onClick={setStudentMode} className='w-75'>{t("std")}</p>
              </div>

            }

            {selectMode === 2 ?
              <div style={{ cursor: "pointer" }} className='w-50 text-center fw-bold text -primary '>
                <p onClick={setParentMode} className='bg-primary rounded-2 text-white'>{t("parent")}</p>
              </div>
              :
              <div style={{ cursor: "pointer" }} className='w-50 text-center '>
                <p onClick={setParentMode} className='w-75'>{t("parent")}</p>
              </div>

            }
          </div>

          {emailExistFlag ?
            <div className='alert alert-danger rounded-3  m-auto w-auto text-center'>
              <p className='p-0 m-0'>{errMsg}</p>
            </div>
            : emailExistFlag === false ?
              <div className='alert alert-success rounded-3  m-auto w-auto text-center'>
                <p className='p-0 m-0'>{errMsg}</p>
              </div>
              : ""
          }

          {selectMode === 1 ?

            <form onSubmit={formikObjForStudent.handleSubmit}>

              <div className="form-group">

                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="name">{t("SignUpName")}</label>
                  <input onBlur={formikObjForStudent.handleBlur} onChange={formikObjForStudent.handleChange} value={formikObjForStudent.values.name} type='text' id='name' className='form-control' placeholder={t("namePlace")} />
                  {formikObjForStudent.errors.name && formikObjForStudent.touched.name ? <div className='alert alert-danger mt-1 '>{formikObjForStudent.errors.name}</div> : ''}
                </div>


                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="email">{t("email")}</label>
                  <input onBlur={formikObjForStudent.handleBlur} onChange={formikObjForStudent.handleChange} value={formikObjForStudent.values.email} type='text' id='email' className='form-control' placeholder={t("emailPlace")} />
                  {formikObjForStudent.errors.email && formikObjForStudent.touched.email ? <div className='alert alert-danger mt-1'>{formikObjForStudent.errors.email}</div> : ''}
                </div>

                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="email">{t("parentEmail")}</label>
                  <input onBlur={formikObjForStudent.handleBlur} onChange={formikObjForStudent.handleChange} value={formikObjForStudent.values.parent_email} type='text' id='parent_email' className='form-control' placeholder={t("parentEmailPlace")} />
                  {formikObjForStudent.errors.parent_email && formikObjForStudent.touched.parent_email ? <div className='alert alert-danger mt-1'>{formikObjForStudent.errors.parent_email}</div> : ''}
                </div>


                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="password">{t("password")}</label>
                  <input onBlur={formikObjForStudent.handleBlur} onChange={formikObjForStudent.handleChange} value={formikObjForStudent.values.password} type='password' id='password' className='form-control' placeholder={t("passwordPlace")} />
                  {formikObjForStudent.errors.password && formikObjForStudent.touched.password ? <div className='alert alert-danger mt-1'>{formikObjForStudent.errors.password}</div> : ''}
                </div>

                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="confirmPassword">{t("conPassword")}</label>
                  <input onBlur={formikObjForStudent.handleBlur} onChange={formikObjForStudent.handleChange} value={formikObjForStudent.values.confirmPassword} type='password' id='confirmPassword' className='form-control' placeholder={t("conpasswordPlace")} />
                  {formikObjForStudent.errors.confirmPassword && formikObjForStudent.touched.confirmPassword ? <div className='alert alert-danger mt-1'>{formikObjForStudent.errors.confirmPassword}</div> : ''}
                </div>


              </div>

              <button type='submit' className='btn btn-primary' disabled={!formikObjForStudent.isValid || !formikObjForStudent.dirty} >{t("SignUp")}</button>

            </form>

            :

            <form onSubmit={formikObjForParent.handleSubmit}>

              <div className="form-group">

                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="name">{t("SignUpName")}</label>
                  <input onBlur={formikObjForParent.handleBlur} onChange={formikObjForParent.handleChange} value={formikObjForParent.values.name} type='text' id='name' className='form-control' placeholder={t("namePlace")} />
                  {formikObjForParent.errors.name && formikObjForParent.touched.name ? <div className='alert alert-danger mt-1 '>{formikObjForParent.errors.name}</div> : ''}
                </div>


                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="email">{t("email")}</label>
                  <input onBlur={formikObjForParent.handleBlur} onChange={formikObjForParent.handleChange} value={formikObjForParent.values.email} type='text' id='email' className='form-control' placeholder={t("emailPlace")} />
                  {formikObjForParent.errors.email && formikObjForParent.touched.email ? <div className='alert alert-danger mt-1'>{formikObjForParent.errors.email}</div> : ''}
                </div>


                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="password">{t("password")}</label>
                  <input onBlur={formikObjForParent.handleBlur} onChange={formikObjForParent.handleChange} value={formikObjForParent.values.password} type='password' id='password' className='form-control' placeholder={t("passwordPlace")} />
                  {formikObjForParent.errors.password && formikObjForParent.touched.password ? <div className='alert alert-danger mt-1'>{formikObjForParent.errors.password}</div> : ''}
                </div>

                <div className="mb-3">
                  <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="confirmPassword">{t("conPassword")}</label>
                  <input onBlur={formikObjForParent.handleBlur} onChange={formikObjForParent.handleChange} value={formikObjForParent.values.confirmPassword} type='password' id='confirmPassword' className='form-control' placeholder={t("conpasswordPlace")} />
                  {formikObjForParent.errors.confirmPassword && formikObjForParent.touched.confirmPassword ? <div className='alert alert-danger mt-1'>{formikObjForParent.errors.confirmPassword}</div> : ''}
                </div>


              </div>

              <button type='submit' className='btn btn-primary' disabled={!formikObjForParent.isValid || !formikObjForParent.dirty}>{t("SignUp")}</button>

            </form>

          }

        </div>
      </div>
    </div>

  </>
}
