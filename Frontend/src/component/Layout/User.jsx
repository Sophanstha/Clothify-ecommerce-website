import React, { useState } from 'react'

const User = () => {
  
  const [user,setUser] = useState({
    name :"",
    email :"",
    password :"",
    role :"customer"
  })

  const userinfo =[ {
    _id :1,
    name :"john",
    role : "admin",
    email : "john@gmail.com"
  }]

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log('====================================');
    console.log(user);
    console.log('====================================');
  }

  const handleChangeRole = (userid,role)=>{
    console.log('====================================');
    console.log(role);
    console.log('====================================');

  }

  const handleDelet = (userid)=>{
    console.log('====================================');
    console.log(userid);
    console.log('====================================');
  }
    return (
        <>
        {/* <div className='max-w-fit h-auto flex flex-col justify-center items-center gap-6'> */}
        <div className='w-full max-w-md mx-auto h-auto flex flex-col justify-center items-center gap-6'>
            <h1 className='font-bold text-2xl tracking-tighter'>User Management</h1>

            <h2 className='text-lg font-semibold tracking-tighter '>Add new User</h2>

            <form
            onSubmit={handleSubmit}
            className='w-full h-auto flex flex-col gap-3'>
              <div className='w-full'>
             <label className='ml-2 text-gray-500 tracking-tighter mb-2 font-bold block'>Name</label>
            <input className='forced-colors:to-blue-200 w-full p-2 border border-black  rounded focus:border-blue-500' type='text' placeholder='enter your name' value={user.name} onChange={(e)=>setUser({...user,name:e.target.value} ) }/>
              </div>
              <div className='w-full'>
             <label className='ml-2 text-gray-500 tracking-tighter mb-2 font-bold block'>Email</label>
            <input className='forced-colors:to-blue-200 w-full p-2 border border-black  rounded focus:border-blue-500' type='text' placeholder='enter your name' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value} ) }/>
              </div>
              <div className='w-full'>
             <label className='ml-2 text-gray-500 tracking-tighter mb-2 font-bold block'>password</label>
            <input className='forced-colors:to-blue-200 w-full p-2 border border-black  rounded focus:border-blue-500' type='password' placeholder='enter your name' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value} ) }/>
              </div>
             <label className='ml-2 text-gray-500 tracking-tighter  font-bold block'>role</label>
        <select className='border w-1/2' value={user.role} onChange={(e)=>setUser({...user,role:e.target.value})}>
          <option value={"customer"}>customer</option>
          <option value={"admin"}>Admin</option>
        </select>

        <button type='submit' className='bg-green-600 text-white p-1 rounded mt-3 hover:bg-green-800'>
          Submit
        </button>
            </form>

       <div className="overflow-x-auto mt-6">
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Role</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            userinfo.map((item)=>(
          <tr key={item._id}>
            <td className="border border-gray-400 px-4 py-2">{item.name}</td>
            <td className="border border-gray-400 px-4 py-2">{item.email}</td>
            <td className="border border-gray-400 px-4 py-2">
              <select className="border px-2 py-1 rounded" value={item.role} onChange={(e)=>handleChangeRole(item._id,e.target.value)}>
                <option value="customer">Customer</option>
                <option value="admin" selected>
                  Admin
                </option>
              </select>
            </td>
            <td className="border border-gray-400 px-4 py-2">
              <button onClick={()=>handleDelet(item._id)}  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>
))}
        </tbody>
      </table>
    </div>
        </div>
        </>

  )
}

export default User