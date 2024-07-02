import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteForStudent({children}) {


    if(localStorage.getItem("tkn") ===null || localStorage.getItem("userRole")!=="STUDENT"){
        return <Navigate to={"/login"}/>
    }


  return (
    <>
          {children}  
    
    </>
  )
}
