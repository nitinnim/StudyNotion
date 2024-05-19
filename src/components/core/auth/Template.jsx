import React from 'react'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import frameImg from "../../../assets/Images/frame.png"
import { useSelector } from 'react-redux'


const Template = ({title, description1, description2, image, formType}) => {

  const {loading} = useSelector( (state) => state.auth );

  return (
    <div className="grid place-items-center py-4 mt-14 min-h-[calc(100vh-3.5rem)]">

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex w-11/12 max-w-maxContent mx-auto items-center justify-between">

        <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
          <h3 className='text-3xl text-richblack-25 font-bold'>{title}</h3>
          <div className='mt-4 text-[1.125rem] leading-[1.625rem]'>
            <p className='text-richblack-100'>{description1}</p>
            <p className='font-edu-sa font-bold italic text-blue-100'>{description2}</p>
          </div>
          {
            formType === "login" ? (<LoginForm/>) : (<SignupForm/>)
          }
        </div>

        <div className='relative hidden md:block mx-auto w-11/12 max-w-[450px] md:mx-0'>
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img 
            src={image}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
        </div>

        </div>
      )}

    </div>
  )
}

export default Template
