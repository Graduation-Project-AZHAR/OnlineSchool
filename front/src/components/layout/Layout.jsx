import React from 'react'
import Header from './../header/Header';
import { Link, Outlet } from 'react-router-dom';
import barcss from '../layout/layout.module.css'

export default function Layout() {
    return <>
        <Header />
        <div className="row">
            <div className="col-3 ">
                <div className={barcss.boxcontainer}>
                    <div className={barcss.box} >
                        <div className='text-center py-5 w-100 vh-100 '>
                            <Link to={'/home'} className='nav-link text-primary fs-3 my-4'>Home</Link>
                            <Link to={'/teacher'} className='nav-link text-primary fs-3 my-4'>Teachers</Link>
                            <Link to={'/subject'} className='nav-link text-primary fs-3 my-4'>Subjects</Link>
                            <Link to={'/...'} className='nav-link text-primary fs-3 my-4'>About Us</Link>
                            <Link to={'/subjects'} className='nav-link text-primary fs-3 my-4'>Contact Us</Link>
                        </div>
                    </div>

                </div>







            </div>
            <div className="col-9">
                <Outlet />
            </div>
        </div>

    </>
}
