import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import AdminSIdeBar from './AdminSIdeBar';
import { Outlet } from 'react-router-dom';


const Adminlayout = () => {
const [isSideBarOpen,setIsSideBarOpen] = useState(false);
const handleToggle = ()=>{
  setIsSideBarOpen(!isSideBarOpen)
}

  return (
    // <div className='min-h-screen flex-col md:flex-row relative'>
<div className="min-h-screen flex flex-col md:flex-row relative">

<div className='md:hidden flex bg-gray-900 text-white z-50 p-4'>
      <button onClick={handleToggle}>
        <FaBars size={24}/>
      </button>
      <h1 className='ml-4 text-4xl font-medium'> Admin DashBoard</h1>
      </div>
{/* overlay for mobile  */}
{
  isSideBarOpen && (
    <div className='fixed inset-0 z-10 bg-black opacity-50 md:hidden' onClick={handleToggle}>
    </div>

  )
}
<div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${isSideBarOpen ? 'translate-x-0' :"-translate-x-full"} transition-transform duration-300
md:translate-x-0 md:static md:block z-50
`}>
  {/* admin sidebar */}
<AdminSIdeBar/>
</div>
<div className='flex-grow overflow-auto p-6'>
  <Outlet/>
</div>

    </div>
  )
}

export default Adminlayout