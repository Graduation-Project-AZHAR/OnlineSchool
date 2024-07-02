import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import UnitCss from '../units/units.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Units() {

  const navigate = useNavigate();
  const { t} = useTranslation();

  const [unit, setUnit] = useState(null);
  const [student, setStudent] = useState(null);
  const [unitFlages, setUnitFlages] = useState(null);

  async function getUnits() {
    try {

      const { data } = await axios.get('http://localhost:8080/subject/subjectUnites/' + localStorage.getItem('subId'), {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });
      setUnit(data);

    } catch (error) {
      console.log("error in units");
    }
  }

  function unitPathCheck() {
    if (localStorage.getItem("subId") === null || localStorage.getItem("subName") === null)
      setTimeout(function () {
        navigate('/subject')
      }, 0);
  }

  useEffect(() => {
    unitPathCheck();
    getUnits();
    getStudentByEmail();

  }, [])

  useEffect(() => {
    if (student)
      getUnitFlages(student.id)
  }, [student])


  function NavTolesson(unitNumber, unitName) {
    localStorage.setItem('unitNumber', unitNumber);
    localStorage.setItem('unitName', unitName);
    setTimeout(function () {
      navigate('/lesson')
    }, 100);
  }

  function NavToSubjectExam() {
    setTimeout(function () {
      navigate('/subjectfinalexam')
    }, 100);
  }

  function backToSubjects() {
    setTimeout(function () {
      navigate('/subject')
    }, 100);
  }

  async function getUnitFlages(stdId) {
    try {

      const { data } = await axios.get('http://localhost:8080/solve/getUnitesFlags/' + stdId + "/" + localStorage.getItem('subId'), {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });
      setUnitFlages(data);

    } catch (error) {
      console.log("error in units");
    }
  }

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
      setStudent(data);

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





  return (
    <>
      <Header />
      {unit === null || unitFlages === null ? <>
        <div className='mt-5'>.</div>
        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
          <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>

        </div>
      </> : <>
        <div className='mt-5'>.</div>
        <div className=" w-75 m-auto mt-3 pb-3 mb-3 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
          <div className=' w-100 overflow-auto'>

            {/* //Sub Name & Teacher Name */}
            {/* <div className='d-flex justify-content-between w-100 pt-3'>

              <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center ms-5 '>

                <div className={UnitCss.user + " "}>
                  <img src={require('../../images/userr.png')} className='w-100 img-fluid rounded-circle' alt="teacher photo" />
                </div>
                <div className='pt-2'>
                  <p className={UnitCss.bold + " pt-2"}>  {localStorage.getItem("teacherName")} </p>
                </div>

              </div>

              <div className='d-flex justify-content-centerd-flex justify-content-center align-items-center me-5'>

                <div className='pt-2'><p className={UnitCss.bold}>{localStorage.getItem('subName')}</p></div>
                <div className={UnitCss.user + " "}>
                  <img src={localStorage.getItem('subPhoto')} className='w-100 img-fluid rounded-circle ms-1' alt="" />
                </div>
              </div>



            </div> */}

        <div className={UnitCss.container +" mt-3"}>
              <div className={UnitCss.infoSection}>
                <div className={UnitCss.userImage}>
                  <img src={require('../../images/userr.png')}className="img-fluid" alt="teacher photo" />
                </div>
                <p className="text pt-3">{localStorage.getItem("teacherName")}</p>
              </div>

              <div className={UnitCss.infoSection +" pt-2"}>
                <p className={UnitCss.text + " pb-3 me-2"}>{localStorage.getItem('subName')}</p>
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
                <div className='text-dark card w-75 m-auto mt-1  rounded-3 p-2'>
                  <div className='card body p-2'>
                    <h4 className='card-title text-center'>{unit.title}</h4>
                    <p className='card-text text-center'>{unit.description}</p>

                    {unitFlages[idx].Flag === true ?
                      <div className='text-center row justify-content-center'>
                        <div className='col-3'>
                          <button onClick={() => { NavTolesson(unit.number, unit.title) }} className='btn btn-primary w-100'>{t("openBtn")}</button>
                        </div>

                      </div> :

                      <div className='text-center row justify-content-center'>
                        <div className='col-3'>
                          <button className='btn btn-danger w-100' disabled={true}>{t("lockBtn")}</button>
                        </div>

                      </div>
                    }
                  </div>

                </div>
              </div>
            })}

            <div className='text-dark card w-75 m-auto mt-1  rounded-3 p-2'>
              <div className='card body p-2'>
                <h4 className='card-title text-center'>{" امتحان مادة " + localStorage.getItem('subName')} </h4>
                <div className='text-center row justify-content-center'>
                  <div className='col-3'>
                    <button onClick={() => { NavToSubjectExam() }} className='btn btn-success w-100 '>{t("openBtn")}</button>
                  </div>

                </div>
              </div>

            </div>

            <div className='w-100 row justify-content-center'>
              <div className='col-6 '>
                <button onClick={backToSubjects} className='w-100 btn btn-primary m-3 rounded-4 fs-6'>{t("backToSubjects")}</button>
              </div>
            </div>



          </div>
        </div>
      </>}


    </>
  )
}
