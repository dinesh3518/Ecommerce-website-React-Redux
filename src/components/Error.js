import React from 'react'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <div className='vh-100 d-flex flex-wrap flex-column m-5 align-items-center'>
        <h3>Invalid URL !!!</h3>
        <p>Go to Do-MART <Link to={'/'}>Home page</Link>. Happy shopping</p>
    </div>
  )
}

export default Error