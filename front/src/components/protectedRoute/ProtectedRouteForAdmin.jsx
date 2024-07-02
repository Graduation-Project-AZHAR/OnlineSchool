import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteForAdmin({children}) {

    if (localStorage.getItem("tkn") === null || localStorage.getItem("userRole") !== "ADMIN") {
        return <Navigate to={"/login"} />
    }


    return (
        <>
            {children}

        </>
    )
}
