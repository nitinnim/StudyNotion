import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { BiArrowBack } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector(state => state.auth)
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const {password, confirmPassword} = formData;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleOnChanage(e) {
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ) )
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] text-white place-items-center">
      {
        loading ? (
            <div className="text-white font-3xl">
                Loading...
            </div>
        ) : (
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h2 className="text-3xl font-bold text-[#F1F2FF]">Choose new password</h2>
                <p className="text-[#AFB2BF] my-3">Almost done. Enter your new password and youre all set</p>

                <form 
                    onSubmit={handleOnSubmit}
                    className='mt-6 flex w-full flex-col gap-y-4'
                >
                    <label className='relative' htmlFor="password">
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New Password <sup className="text-pink-200">*</sup> </p>
                        <input 
                            required
                            type={showPassword ? "text" : "password"} 
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Enter Password'
                            onChange={handleOnChanage}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 bottom-3 z-10 text-richblack-100 cursor-pointer'
                        >
                            {
                                showPassword ? (<IoEyeOutline fontSize={24} />) : (<IoEyeOffOutline fontSize={24} />)
                            }
                        </span>
                    </label>
                    <label className='relative' htmlFor="confirmPassword">
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm New Password <sup className="text-pink-200">*</sup> </p>
                        <input 
                            required
                            type={showConfirmPassword ? "text" : "password"} 
                            name='confirmPassword'
                            id='confirmPassword'
                            value={confirmPassword}
                            placeholder='Enter Confirm Password'
                            onChange={handleOnChanage}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 bottom-3 z-10 text-richblack-100 cursor-pointer'
                        >
                            {
                                showConfirmPassword ? (<IoEyeOutline fontSize={24} />) : (<IoEyeOffOutline fontSize={24} />)
                            }
                        </span>
                    </label>

                    <button
                        type='submit'
                        className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                    >
                        Reset Password
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

export default UpdatePassword
