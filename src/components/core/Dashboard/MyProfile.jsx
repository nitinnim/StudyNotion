import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {

  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-4 items-center md:items-start">
      <h2 className='text-3xl mb-14'>My Profile</h2>

      <div className='flex flex-col w-full gap-10 mb-10'>

        {/* section 1 */}
        <div className='flex md:gap-0 gap-6 md:flex-row flex-col-reverse rounded-lg bg-richblack-800 justify-between px-12 py-8 items-center'>
          {/* left */}
          <div className='flex md:flex-row flex-col md:gap-5 gap-1 justify-between items-center'>
            <div className=''>
              <img 
                src={user?.image} 
                className='aspect-square object-cover rounded-full w-20'
                alt={` ${user?.firstName} + " " + ${user?.lastName}`} 
              />
            </div>
            <div className='flex flex-col items-center md:items-start md:gap-1 gap-0'>
              <h3 className='font-bold text-lg'>{user?.firstName} {user?.lastName}</h3>
              <p className='text-richblack-400 text-[14px]'>{user?.email}</p>
            </div>
          </div>

          {/* right */}
          <div className='flex text-black items-center rounded font-semibold bg-[#FFD60A]'>
            <IconBtn
              text="Edit" 
              onclick={() => navigate("/dashboard/settings")} 
            >
              <FiEdit />
            </IconBtn>
          </div>

        </div>

        {/* section 2 */}
        <div className="flex rounded-lg px-6 md:px-12 py-8 bg-richblack-800 flex-col gap-10">
          <div className='flex md:flex-row flex-col-reverse md:gap-0 gap-6 justify-between items-center'>
            {/* left */}
            <div className='flex gap-5 justify-between items-center'>
              <h4 className='font-bold text-lg'>About</h4>
            </div>

            {/* right */}
            <div className='flex text-black items-center rounded font-semibold bg-[#FFD60A]'>
            <IconBtn
              text="Edit" 
              onclick={() => navigate("/dashboard/settings")} 
            >
              <FiEdit />
            </IconBtn>
          </div>
          </div>

          {/* about */}
          <div className='text-richblack-400 text-[14px]'>
            {
              user?.additionalDetails?.about ? (<p>{user?.additionalDetails?.about}</p>) : (<p>Write Something About Yourself</p>)
            }
          </div>

          {/* account type */}
          <div>
            <p>Account Type: <span className='font-semibold'>{user?.accountType}</span></p>
          </div>
        </div>
        
        {/* section 3 */}
        <div className="flex rounded-lg  md:px-12 px-6 py-8 bg-richblack-800 flex-col gap-10">
          <div className='flex gap-4 justify-between items-center'>
            {/* left */}
            <div className='flex gap-5 justify-between items-center'>
              <h4 className='font-bold text-lg'>Profile Details</h4>
            </div>

            {/* right */}
            <div className='flex text-black items-center rounded font-semibold bg-[#FFD60A]'>
            <IconBtn
              text="Edit" 
              onclick={() => navigate("/dashboard/settings")} 
            >
              <FiEdit />
            </IconBtn>
            </div>
          </div>

          <div className='grid sm:grid-cols-2 sm:w-[75%]'>

            <div className='flex flex-col mb-5 gap-y-1'>
              <h5 className='text-[14px] text-richblack-400'>First Name</h5>
              <p className='text-[14px] font-semibold'>{user.firstName}</p>
            </div>

            <div className='flex flex-col mb-5 gap-y-1'>
              <h5 className='text-[14px] text-richblack-400'>Last Name</h5>
              <p className='text-[14px] font-semibold'>{user.lastName}</p>
            </div>

            <div className='flex flex-col mb-5 gap-y-1'>
              <h5 className='text-[14px] text-richblack-400'>Email</h5>
              <p className='text-[14px] font-semibold'>{user.email}</p>
            </div>

            <div className='flex flex-col mb-5 gap-y-1'>
              <h5 className='text-[14px] text-richblack-400'>Phone Number</h5>
              <p className='text-[14px] font-semibold'>{user?.additionalDetails?.contactNumber ? (user?.additionalDetails?.contactNumber): "Add Contact Number"}</p>
            </div>

            <div className='flex flex-col mb-5 gap-y-1'>
              <h5 className='text-[14px] text-richblack-400'>Gender</h5>
              <p className='text-[14px] font-semibold'>{user?.additionalDetails?.gender ? (user?.additionalDetails?.gender): "Add Gender"}</p>
            </div>

            <div className='flex flex-col mb-5 gap-y-1'>
              <h5 className='text-[14px] text-richblack-400'>Date Of Birth</h5>
              <p className='text-[14px] font-semibold'>{user?.additionalDetails?.dateOfBirth ? (user?.additionalDetails?.dateOfBirth): "Add Date of Birth"}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default MyProfile
