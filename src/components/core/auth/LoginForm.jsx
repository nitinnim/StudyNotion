import React, { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const {email, password} = formData

  const [showPassword, setShowPassword] = useState(false);

  function onChangeHandler(e) {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form 
      className='mt-6 flex w-full flex-col gap-y-4'
      onSubmit={handleOnSubmit}
    >
      
      <label className="w-full" htmlFor="email">
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address <sup className='text-pink-200'>*</sup> </p>
        <input
          required
          type="email"
          name='email'
          onChange={onChangeHandler}
          value={email}
          placeholder='Enter email address'
          className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
        />
      </label>

      <label className="relative" htmlFor="password">
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Password <sup className='text-pink-200'>*</sup> </p>
        <input
          required
          type="password"
          name='password'
          onChange={onChangeHandler}
          value={password}
          placeholder='Enter Password'
          className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5'
        />
        <span 
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-3 bottom-[33px] z-10 text-richblack-100 cursor-pointer'
        >
          {
            showPassword ? (<IoEyeOffOutline fontSize={24} fill='AFB2BF'/>) : (<IoEyeOutline fontSize={24} fill='AFB2BF'/>)
          }
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
