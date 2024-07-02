import React, { useState } from 'react'
import { useFormik } from 'formik'
import RegisterCss from '../register/register.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function Login() {

  
  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  
  useEffect(() => {
    window.document.dir = i18n.dir();
    
  }, [lng])
  
  const changeLanguage = (lang) => {
    
    i18n.changeLanguage(lang);
  };
  
  
  const [emailExistFlag, setEmailExistFlag] = useState(null)
  const [errMsg, setErrMsg] = useState(null);


  const navigate = useNavigate();
  async function login(values) {

    try {

      const { data } = await axios.post('http://localhost:8080/user/api/authenticate', values);
      console.log(data);
      setEmailExistFlag(false);
      setErrMsg(t("Loginsucc"))

      localStorage.setItem("userEmail", values.email);
      localStorage.setItem("tkn", data.token);
      localStorage.setItem("userRole", data.UserRole);

      if (data.UserRole === "STUDENT") {
        setTimeout(() => {
          navigate("/subject")
        }, 1000);
      }
      else if (data.UserRole === "PARENT") {
        setTimeout(() => {
          navigate("/parentHome")
        }, 1000);
      }
      else if (data.UserRole === "TEACHER") {
        setTimeout(() => {
          navigate("/teacherHome")
        }, 1000);
      }
      else if (data.UserRole === "ADMIN") {
        setTimeout(() => {
          navigate("/adminHome")
        }, 1000);
      }


    } catch (error) {
      setErrMsg(t("loginErr"));
      setEmailExistFlag(true);
    }

  }

  let user = {
    email: '',
    password: ''
  }
  //use formik library =>will map your form with object and best way for validation
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: login,
    validate: function (values) {
      const errors = {};

      setEmailExistFlag(null);
      setErrMsg(null);

      if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = t("validateEmailErr")
      }


      if (values.password.length < 5 || values.password.length > 12) {
        errors.password = t("validatePasswordErr")
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
              <NavDropdown title={t("lang")}id="language-dropdown-mobile">
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


    <div className={RegisterCss.over}>
      <div className={RegisterCss.bodyy + " vh-100  d-flex justify-content-center align-items-center"}>
        <div className={RegisterCss.containerr + ' w-50 py-5 '}>

          <h2>{t("login")} </h2>


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


          <form onSubmit={formikObj.handleSubmit}>

            <div className="form-group">


              <div className="mb-3">
                <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="email">{t("email")}</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type='text' id='email' className='form-control' placeholder={t("emailPlace")} />
                {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger mt-1'>{formikObj.errors.email}</div> : ''}
              </div>


              <div className="mb-3">
                <label className='fs-5' style={{ marginBottom: '5px' }} htmlFor="password">{t("password")}</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type='password' id='password' className='form-control' placeholder={t("passwordPlace")} />
                {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger mt-1'>{formikObj.errors.password}</div> : ''}
              </div>



            </div>

            <button type='submit' className='btn btn-primary' disabled={!formikObj.isValid || !formikObj.dirty}>{t("login")}</button>

          </form>

        </div>
      </div>
    </div>

  </>
}


