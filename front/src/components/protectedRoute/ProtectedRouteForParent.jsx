import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteForParent({ children }) {


    if (localStorage.getItem("tkn") === null || localStorage.getItem("userRole") !== "PARENT") {
        return <Navigate to={"/login"} />
    }


    return (
        <>
            {children}

        </>
    )
}
