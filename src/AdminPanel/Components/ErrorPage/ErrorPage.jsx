import React from 'react'
import './ErrorPage.css'
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
 
const ErrorPage = () => {

    return (
        <div className='error-page'>

            <h1 className='error-page-text'>404 - Page Not Found</h1>
            <Link to='/'>
                <button className='go-back-btn'><BiArrowBack /> Go back</button>

            </Link>
        </div>
    )
}

export default ErrorPage;
