import React, { useEffect } from 'react'
import HomeCss from '../home/home.module.css'
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import cookies from "js-cookie"

import { useTranslation } from 'react-i18next';



export default function Home() {

  const { t, i18n } = useTranslation();
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir();

  }, [lng])

  const changeLanguage = (lang) => {

    i18n.changeLanguage(lang);
  };


  return <>
    {/* Start header */}

    {cookies.get("i18next") === "en" ?

      <div className='container-fluid w-100 bg-white fixed-top border-bottom'>
        <Navbar sticky="top" expand="lg" bg="white" variant="light" className="container">
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

      <div className='container-fluid w-100 bg-white fixed-top border-bottom'>
        <Navbar sticky="top" expand="lg" bg="white" variant="light" className="container">
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
    {/* End header */}

    {/* Start Content */}

    <div className={HomeCss.content + " bg-white container " + HomeCss.boxcontainer + " d-flex justify-content-centerd-flex justify-content-center align-items-center m-auto mb-5"}>


      <div className='row'>
        <div className={HomeCss.class + ' col-lg-5'}>
          <img src={require('../../images/homePage.webp')} className='w-100' alt="home page photo" />
        </div>
        <div className='fs-3 col-lg-7  ps-4 pt-5'>
          <p className={HomeCss.family + " mt-5"}>{t("intro_part1")}
            <span className={HomeCss.boldd}>{t("intro_part2")} <span className={HomeCss.step}>{t("intro_part3")}</span> {t("intro_part4")}</span>
          </p>
          <div className='text-center row justify-content-center'>
            <div className="col-4">
              <Link to={'/login'}><button type="button" className={HomeCss.btnn + " btn btn-primary fs-5 m-3 w-100"}>{t("Home_opt1")}</button></Link>
            </div>
            <div className="col-4">
              <Link to={'/register'}><button type="button" className={HomeCss.btnn + " btn btn-light fs-5 m-3 w-100"}>{t("Home_opt2")}</button></Link>
            </div>


          </div>
        </div>
      </div>



      {/* <div >
          <img src={require('../../images/homePage.webp')} className='w-100' alt="home page photo" />
        </div>
        <div className='fs-2 '>
          <p className={HomeCss.family + " mt-5"}>Our Online School is a comprehensive learning ecosystem.
            <span className={HomeCss.boldd}>We are with you <span className={HomeCss.step}>step-by-step</span> towards success, offering flexible, high-quality education tailored to your needs. Join our community of learners and start achieving your goals today!</span>
          </p>
          <div className='text-center '>
            <Link to={'/login'}><button type="button" className={HomeCss.btnn + " btn btn-primary fs-5 m-3"}>I have an account</button></Link>
            <Link to={'/register'}><button type="button" className={HomeCss.btnn + " btn btn-light fs-5 m-3"}>New account</button></Link>
          </div>
        </div>
       */}


    </div>

    {/* End Content */}

  </>
}
