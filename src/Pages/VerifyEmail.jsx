import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signUp } from '../services/operations/authAPI';

const VerifyEmail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const {loading, signupData} = useSelector((state) => state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
      
        dispatch(
            signUp(
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              otp,
              navigate,
            )
        );

    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] text-white place-items-center">
      {
        loading ? (
            <div className="text-white font-3xl">
                Loading...
            </div>
        ) : (
            <div className='max-w-[500px] text-white p-4 lg:p-8'>
                <h2 className="text-3xl font-bold text-[#F1F2FF]">Verify email</h2>
                <p className="text-[#AFB2BF] my-3">A verification code has been sent to you. Enter the code below</p>

                <form 
                    onSubmit={handleOnSubmit}
                    className='mt-6 flex w-full flex-col gap-y-4'
                >
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        // renderSeparator={<span> </span>}
                        renderInput={(props) => 
                            <input
                            {...props}
                            placeholder="-"
                            style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[48px] mr-3 lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                          />
                        }
                    />

                    <button
                        type='submit'
                        className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                    >
                        Verify email
                    </button>
                </form>

                <div className='mt-6 flex justify-between w-full'>
                    <div className="flex items-center justify-between">
                        <Link to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5">
                            <BiArrowBack /> Back To Login
                        </p>
                        </Link>
                    </div>
                    <button
                        className="flex items-center text-blue-100 gap-x-2"
                        onClick={() => dispatch(sendOtp(signupData.email))}
                        >
                        <RxCountdownTimer />
                        Resend it
                    </button>
                </div>
                
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
