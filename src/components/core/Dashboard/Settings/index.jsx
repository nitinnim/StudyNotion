import React from 'react'
import ChangeProfile from './ChangeProfile'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'

const Settings = () => {
  return (
    <div className='px-4'>
      <h1 className="mb-14 text-3xl md:text-start text-center font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfile />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  )
}

export default Settings
