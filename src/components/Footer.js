import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='text-center mt-5 mb-2 py-4 border'>
      <div className='d-flex justify-content-center'>
        <Link to={'/'} className='m-2'>Home</Link>
        <Link to={'/contactus'} className='m-2'>Contact us</Link>
      </div>
      <div className='footer-copyright text-center'>
      <small className="">
          &copy; Do-MART, 2023. All rights reserved.
        </small>
      </div>
    </footer>
  )
}

export default Footer