import React, { useState } from 'react'
import Base from '../Base/Base'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


function ResetPassword() {
    const {token} = useParams();
    const [password, setPassword] =useState('');
    const [confirmPassword, setConfirmPassword] =useState('');
    const navigate = useNavigate();

    const userNewPassword={
        password,
        confirmPassword
    }

    const passwordHandling = async()=>{
        const response = await fetch(`https://password-reset1-qy3i.onrender.com/users/reset/password/${token}`,{
          method:'POST',
          body:JSON.stringify(userNewPassword),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data = await response.json();
        console.log(data)
        if(data.message){
          toast(data.message, {
            type: 'success',
            position: toast.POSITION.TOP_CENTER,
        })
          localStorage.setItem("token",data.token)
          navigate("/")
          return;
        }else{
          toast(data.error, {
            position: toast.POSITION.TOP_CENTER,
            type: 'error',
           
        })
        return
        }
    }
  return (
    <Base
    title={'Login page'}
    description={'you can login'}
    >
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 loginpage" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://img.freepik.com/free-vector/butterfly-logo-colorful-gradient-illustrations_483537-972.jpg?w=996&t=st=1687687780~exp=1687688380~hmac=a4343dae5ccb4e60ef41bffc0639c3e79b8d63e53d9d33713036e75d85217605"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Password Reset
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                  autoComplete="current-email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm password"
                  name="confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  style={{paddingLeft:'0.7rem', fontFamily:'monospace',fontSize:'0.9rem'}}
                  autoComplete="current-email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='login-btn'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={passwordHandling}
              >
                Sumbit
              </button>
            </div>

        </div>
      </div>
      </Base>
  )
}

export default ResetPassword;