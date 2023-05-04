import React from 'react';
import './getStartedStyles.css';
import { Link } from 'react-router-dom';

export const GetStarted = () => {
  return (
    <div className='main-getStarted'>
        <div className='icon-section'>
            <div className='icon-div'></div>
        </div>  
        <div className='text'>Keep Track Of Daily Tasks In Life</div>
        <div className='start-button'>
        <Link to='/login' className='link'>Get Started</Link>
               {/* <button>Get Started</button> */}
        </div>
    </div>
  )
}
