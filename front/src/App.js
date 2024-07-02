
import './App.css';
//import createBrowserRouter method for routing part
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//import the needed components to reander it 
import Home from './components/home/Home';
import NotFound from './components/not found/NotFound';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Subject from './components/subject/Subject';
import Units from './components/units/Units';
import Lesson from './components/lesson/Lesson';
import { StdViewProvider } from './contexts/studentViewTrack';
import LessonExplanation from './components/lessonExplanation/LessonExplanation';
import SubjectFinalExam from './components/subjectFinalExam/SubjectFinalExam';
import UnitExam from './components/unitExam/UnitExam';
//section of teacher components
import TeacherHome from './components/teacher/home/Home'
import TeacherUnits from './components/teacher/units/Units'
import TeacherLessons from './components/teacher/lessons/Lessons'
import TeacherLessonExplanation from './components/teacher/lessonExplanation/LessonExplanation'
import TeacherProfile from './components/teacher/teacherProfile/Profile'
//section of admin components
import AdminHome from './components/admin/home/Home'
//section of parent components
import ParentHome from './components/parent/home/Home'
import ParentProfile from './components/parent/parentProfile/Profile'
import ProtectedRouteForStudent from './components/protectedRoute/ProtectedRouteForStudent';
import ProtectedRouteForParent from './components/protectedRoute/ProtectedRouteForParent';
import ProtectedRouteForAdmin from './components/protectedRoute/ProtectedRouteForAdmin';
import ProtectedRouteForTeacher from './components/protectedRoute/ProtectedRouteForTeacher';






const router = createBrowserRouter(
  [
    // {
    //   path: '', element: <Layout />, children: [
    //     { path: 'header', element: <Header /> },

    //   ]
    // },
    { path: '', element: <Home /> },
    { path: '/', element: <Home /> },
    { path: 'home', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },

    //section of student Components
    {
      path: '/subject', element:
        <ProtectedRouteForStudent><Subject /></ProtectedRouteForStudent>
    },
    {
      path: '/subjectfinalexam', element:
        <ProtectedRouteForStudent><SubjectFinalExam /></ProtectedRouteForStudent>
    },
    {
      path: '/units', element:
        <ProtectedRouteForStudent><Units /></ProtectedRouteForStudent>
    },
    {
      path: '/unitexam', element:
        <ProtectedRouteForStudent><UnitExam /></ProtectedRouteForStudent>
    },
    {
      path: '/lesson', element:
        <ProtectedRouteForStudent><Lesson /></ProtectedRouteForStudent>
    },
    {
      path: '/lessonExplanation', element:
        <ProtectedRouteForStudent><LessonExplanation /></ProtectedRouteForStudent>
    },
    //section of teacher components
    {
      path: '/teacherHome', element:
        <ProtectedRouteForTeacher><TeacherHome /></ProtectedRouteForTeacher>
    },
    {
      path: '/teacherunit', element:
        <ProtectedRouteForTeacher><TeacherUnits /></ProtectedRouteForTeacher>
    },
    {
      path: '/teacherlesson', element:
        <ProtectedRouteForTeacher><TeacherLessons /></ProtectedRouteForTeacher>
    },

    {
      path: '/teacherProfile', element:
        <TeacherProfile />
    },

    {
      path: '/teacherTeacherLessonExplanation', element:
        <ProtectedRouteForTeacher><TeacherLessonExplanation /></ProtectedRouteForTeacher>
    },
    //----------------------------------
    { path: '*', element: <NotFound /> },
    //section of admin components
    {
      path: '/adminHome', element:
        <ProtectedRouteForAdmin> <AdminHome /> </ProtectedRouteForAdmin>
    },
    //section of parent components
    {
      path: '/parentHome', element:
        <ProtectedRouteForParent> <ParentHome /> </ProtectedRouteForParent>
    },
    {
      path: '/parentProfile', element:
        <ProtectedRouteForParent> <ParentProfile /> </ProtectedRouteForParent>
    },


  ]

)





function App() {
  
  return <>

    <StdViewProvider>
      <RouterProvider router={router}></RouterProvider>
    </StdViewProvider>
  </>
}

export default App;