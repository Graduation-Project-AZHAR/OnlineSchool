import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteForTeacher({children} ) {


    if(localStorage.getItem("tkn") ===null || localStorage.getItem("userRole")!=="TEACHER"){
        return <Navigate to={"/login"}/>
    }


  return (
    <>
          {children}  
    
    </>
  )
}
