import React from 'react'
import Topbar from '../Layout/Topbar'
import Nav from '../Layout/Nav'

const Header = () => {
  return (
    <div className='border-b border-gray-200'>
        <Topbar/>
        <Nav/>
    </div>
  )
}

export default Header