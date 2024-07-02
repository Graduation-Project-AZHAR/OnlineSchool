import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UnitExam() {


  const [showFinalResults, setShowFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [questions, setQuestions] = useState(null);

  async function getSelectedUnit() {
    try {
      const { data } = await axios.get('http://localhost:8080/subject/subjectUnites/' + localStorage.getItem('subId'), {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
      });
      const selectedUnit = data.filter(data => data.number === Number(localStorage.getItem('unitNumber')));
      setQuestions(selectedUnit[0].exercise);
    } catch (error) {
      console.log("Error in get unit question");
    }

  }


  useEffect(() => {
    if (localStorage.getItem("subId") === null || localStorage.getItem("subName") === null || localStorage.getItem("unitNumber") === null || localStorage.getItem("unitName") === null)
      setTimeout(function () {
        navigate('/subject')
      }, 0);

    getSelectedUnit();
    getStudentByEmail();

  }, [])

  function optionClicked(option, rightAnswer) {
    if (option === rightAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.questionAndAnswer.length) {
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
      console.log(scoreObject);
      const formData = objectToFormData(scoreObject);

      const { data } = await axios.post('http://localhost:8080/solve/addGrade/' + questions.number + "/" + studentData.id, formData, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("tkn")
        }
    });

      console.log(data);
    } catch (error) {
      console.log("error in send score of unit Test To Api",error);
    }

    setTimeout(function () {
      navigate('/lesson')
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
              <h2 className='mt-3'>{" امتحان وحدة "  +localStorage.getItem('unitName')}</h2>
              <h4 className='mt-3'>Current Score: {score}</h4>
            </div>
            {showFinalResults ? <>
              {/* Final result */}
              <div className='text-dark card w-50 m-auto mt-3  rounded-3 p-2 '>
                <div className='card body p-4'>
                  <h2 className='card-title text-center mb-4 fs-5'>Final Results</h2>
                  <h4 className='card-text text-center mb-4 fs-5'>{score} out of {questions.questionAndAnswer.length} correct - ({(score / questions.questionAndAnswer.length).toFixed(2) * 100}%)</h4>
                  <button onClick={() => sendScoreToApi(score)} className='btn btn-primary'>Submit</button>
                </div>
              </div>
            </>
              : <>
                {/* Question Card */}
                <div className='text-dark card w-75 m-auto mt-3  rounded-3 p-2 '>
                  <div className='card body p-4'>
                    <h4 className='card-title text-center mb-4 fs-5'>Question {currentQuestion + 1} out of {questions.questionAndAnswer.length}</h4>
                    <p className='card-text text-center mb-4 fs-5'>{questions.questionAndAnswer[currentQuestion].question}</p>
                    <ul className='list-unstyled text-center'>
                      {questions.questionAndAnswer[currentQuestion].options.map((option, idx) => {
                        return (
                          <li key={idx} onClick={() => optionClicked(option, questions.questionAndAnswer[currentQuestion].answer)} className='bg-info p-3 border border-white border-4 rounded-4 mt-2 ' style={{ cursor: 'pointer' }}>{option}</li>
                        );
                      })}
                    </ul>
                  </div>

                </div>
              </>}



          </div>
        </div>

      </>}
    </>
  )
}
