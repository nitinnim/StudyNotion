import React from 'react'

const CurrentStats = () => {

    const stats = [
        {user: "5k", label: "Active Students"},
        {user: "10+", label: "Mentors"},
        {user: "200+", label: "Courses"},
        {user: "50+", label: "Awards"},
    ]

  return (
    <div className='w-11/12 mx-auto max-w-maxContent'>
      <div className='p-2'>
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {
              stats.map( (stat, index) => (
                  <div key={index} className='py-6 '>
                      <p className="text-[30px] font-bold text-richblack-5">{stat.user}</p>
                      <p className="font-semibold text-[16px] text-richblack-500">{stat.label}</p>
                  </div>
              ) )
          }
        </div>
      </div>
      
    </div>
  )
}

export default CurrentStats
