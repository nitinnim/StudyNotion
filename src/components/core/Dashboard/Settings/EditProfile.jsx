import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'
import { updateProfile } from '../../../../services/operations/SettingsApi'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {

  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* profile info */}
        <div
          className='my-10 p-8 flex flex-col px-12 gap-y-6 rounded-md bg-richblack-800 border-richblack-700'
        >
          <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
          {/* Name */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="lg:w-[48%] gap-2 flex flex-col">
              <label htmlFor="firstName" className="lable-style">First Name</label>
              <input 
                type="text" 
                placeholder="Enter First Name"
                name='firstName'
                id='firstName'
                className='form-style'
                {...register("firstName", {required: true})}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span>Please enter your first name</span>
              )}
            </div>
            <div className="lg:w-[48%] gap-2 flex flex-col">
              <label htmlFor="lastName" className="lable-style">Last Name</label>
              <input 
                type="text" 
                placeholder="Enter Last Name"
                name='lastName'
                id='lastName'
                className='form-style'
                {...register("lastName", {required: true})}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span>Please enter your Last name</span>
              )}
            </div>
          </div>

          {/* DOB and Gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="lg:w-[48%] gap-2 flex flex-col">
              <label htmlFor="dateOfBirth" className="lable-style">Date of Birth</label>
              <input 
                type="date" 
                name='dateOfBirth'
                id='dateOfBirth'
                className='form-style'
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span>{errors.dateOfBirth.message}</span> 
              )}
            </div>

            <div className="lg:w-[48%] gap-2 flex flex-col">
              <label htmlFor="gender" className="lable-style">Gender</label>
              <select 
                // type='text'
                name="gender" 
                id="gender"
                className='form-style'  
                {...register("gender", {required: true})}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option value={ele} key={i}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span>Please select your gender</span>
              )}
            </div>
          </div>

          {/* Number and About */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="lg:w-[48%] gap-2 flex flex-col">
              <label htmlFor="contactNumber" className="lable-style">Contact Number</label>
              <input 
                type="tel" 
                placeholder="Enter Contact Number"
                name='contactNumber'
                id='contactNumber'
                className='form-style'
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span>Please enter your first name</span>
              )}
            </div>

            <div className="lg:w-[48%] gap-2 flex flex-col">
              <label htmlFor="about" className="lable-style">About</label>
              <input 
                type="text" 
                placeholder="Enter Bio Details"
                name='about'
                id='about'
                className='form-style'
                {...register("about", {required: true})}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span>Add Your Bio</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <IconBtn
            type='submit'
            text='Save'
          />
        </div>
      </form>
    </div>
  )
}

export default EditProfile
