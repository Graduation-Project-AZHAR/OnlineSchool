import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SubjectFinalExam() {

  const [showFinalResults, setShowFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [studentData, setStudentData] = useState(null);

  const [questions, setQuestions] = useState(null);

  async function getSelectedSubject() {
    try {
      const { data } = await axios.get('http://localhost:8080/subject/subjects', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });
      const selectedSubject = data.filter(data => data.id === Number(localStorage.getItem('subId')));
      setQuestions(selectedSubject[0].finalQuestionAnswer);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (localStorage.getItem("subId") === null || localStorage.getItem("subName") === null)
      setTimeout(function () {
        navigate('/subject')
      }, 0);
    getSelectedSubject();
    getStudentByEmail();

  }, []);

  function optionClicked(option, rightAnswer) {
    if (option === rightAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
    else {
      setShowFinalResults(true);
    }
  }
  const navigate = useNavigate();

  const objectToFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return formData;
  };
  async function sendScoreToApi(score) {
    try {

      let scoreObject = {
        grade: score
      }
      const formData = objectToFormData(scoreObject);
      const { data } = await axios.post('http://localhost:8080/FinalTest/addGrade/' + Number(localStorage.getItem('subId')) + "/" + studentData.id, formData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });

    } catch (error) {
      console.log("error in send score of Final Test To Api");
    }
    setTimeout(function () {
      navigate('/units')
    }, 100);
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
      setStudentData(data);

    } catch (error) {
      console.log(error);
    }
  }





  return (
    <>
      <Header />

      {questions === null ? <>
        <div className='mt-5'>.</div>
        <div style={{ backgroundColor: '#ecf0f3' }} className='w-75 m-auto mt-3 rounded-5 vh-100 d-flex justify-content-center align-items-center' >
          <i className='fa-solid fa-spin fa-7x text-white fa-spinner'></i>

        </div>
      </> : <>
        <div className='mt-5'>.</div>
        <div className=" w-75 m-auto mt-3 pb-3 mb-3 rounded-5 " style={{ backgroundColor: '#ecf0f3' }}>
          <div className='overflow-auto'>
            {/* Header */}
            <div className='text-center mt-3 w-100' >
              <h2 className='mt-3'>{" امتحان مادة "  +localStorage.getItem('subName')}</h2>
              <h4 className='mt-3'>Current Score: {score}</h4>
            </div>
            {showFinalResults ? <>
              {/* Final result */}
              <div className='text-dark card w-50 m-auto mt-3  rounded-3 p-2 '>
                <div className='card body p-4'>
                  <h2 className='card-title text-center mb-4 fs-5'>Final Results</h2>
                  <h4 className='card-text text-center mb-4 fs-5'>{score} out of {questions.length} correct - ({(score / questions.length).toFixed(2) * 100}%)</h4>
                  <button onClick={() => sendScoreToApi(score)} className='btn btn-primary'>Submit</button>
                </div>
              </div>
            </>
              : <>
                {/* Question Card */}
                <div className='text-dark card w-75 m-auto mt-3  rounded-3 p-2 '>
                  {questions.length !== 0 ?
                    <div className='card body p-4'>
                      <h4 className='card-title text-center mb-4 fs-5'>Question {currentQuestion + 1} out of {questions.length}</h4>
                      <p className='card-text text-center mb-4 fs-5'>{questions[currentQuestion].question}</p>
                      <ul className='list-unstyled text-center'>
                        {questions[currentQuestion].finalOptions.map((option, idx) => {
                          return (
                            <li key={idx} onClick={() => optionClicked(option, questions[currentQuestion].answer)} className='bg-info p-3 border border-white border-4 rounded-4 mt-2 ' style={{ cursor: 'pointer' }}>{option}</li>
                          );
                        })}
                      </ul>
                    </div>:
                    <div className='card body p-4'>
                      <h4 className=''>there is no questions right now</h4>
                    </div>
                }

                </div>
              </>}



          </div>
        </div>

      </>}
    </>
  )
}
