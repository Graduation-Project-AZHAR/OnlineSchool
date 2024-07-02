import React from 'react'
import { Link } from 'react-router-dom';
import CSS from '../not found/notFound.module.css'

export default function NotFound() {

  function clear() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("tkn");
    localStorage.removeItem("userRole");
  }

  return (
    <div className={CSS.notFoundContainer}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link onClick={clear} to="/">Go Back Home</Link>
    </div>
  )
}
