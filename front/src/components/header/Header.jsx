import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import HeaderCss from '../header/header.module.css'
import axios from 'axios';

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie"

export default function Header() {


  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();

  }, [lng])

  const changeLanguage = (lang) => {

    i18n.changeLanguage(lang);
  };


  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);

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

  const objectToFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return formData;
  };



  useEffect(() => {
    getStudentByEmail();


  }, []);



  function logOut() {

    localStorage.removeItem("userEmail");
    localStorage.removeItem("tkn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("subId");
    localStorage.removeItem("subName");
    localStorage.removeItem("unitNumber");
    localStorage.removeItem("unitName");
    localStorage.removeItem("lessonNumber");
    localStorage.removeItem("lessonName");
    localStorage.removeItem("subPhoto");
    localStorage.removeItem("teacherName");

    setTimeout(function () {
      navigate('/home')
    }, 100);
  }

  function navToProfile() {
    setTimeout(() => {
      navigate('/teacherProfile')
    }, 100);
  }
  return <>





    {cookies.get("i18next") === "en" ?

      <div className='container-fluid w-100 bg-light fixed-top border-bottom'>
        <Navbar sticky="top" expand="lg" bg="light" variant="light" className="container">
          <Navbar.Brand className='fs-4 '>
            {t("logo")}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >



            <Nav className=" d-flex d-none d-lg-flex  ms-auto fs-6 w-100">
              <Nav.Link onClick={navToProfile} className='ms-auto' >{t("profile")}</Nav.Link>
              <Nav.Link onClick={logOut} >{t("logOut")}</Nav.Link>

            </Nav>

            <Nav className="ml-auto d-lg-none w-100">
              <Nav.Link onClick={navToProfile}>{t("profile")}</Nav.Link>
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
              <Nav.Link onClick={navToProfile} className='me-auto' >{t("profile")}</Nav.Link>
              <Nav.Link onClick={logOut} >{t("logOut")}</Nav.Link>

            </Nav>

            <Nav className="ml-auto d-lg-none w-100">
              <Nav.Link onClick={navToProfile}>{t("profile")}</Nav.Link>
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


  </>
}
