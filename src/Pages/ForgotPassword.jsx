import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
        loading ? (<div className='text-white font-3xl'>Loading...</div>) : (
        <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-richblack-5 text-[1.875rem] leading-[1.625] my-4 font-semibold">
                {
                    emailSent ? "Check email" : "Reset your password"
                }
            </h1>
            <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                {
                    emailSent ? `We have sent the reset email to your ${email}` : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                }
            </p>
            <form onSubmit={handleOnSubmit}>
                {
                    !emailSent && (
                        <label className="w-full" htmlFor="email">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email address <sup className='text-pink-200'>*</sup> </p>
                            <input 
                                required
                                type="email" 
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                className='form-style py-[12px] px-[12px] font-medium rounded-md bg-richblack-700 border-b border-richblack-100 w-full'
                            />
                        </label>
                    )
                }
                <button
                    type='submit'
                    className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                >
                {
                    !emailSent ? "Submit" : "Reset Email"
                }
                </button>
            </form>
            
            <div className="mt-6 flex items-center justify-between">
                <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5">
                    <BiArrowBack /> Back To Login
                </p>
                </Link>
            </div>

        </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
