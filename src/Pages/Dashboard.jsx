import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/core/Dashboard/SideBar';

const Dashboard = () => {
  
  const {loading: authLoading} = useSelector((state) => state.auth);
  const {loading: profileLoading} = useSelector((state) => state.profile);

  if(authLoading || profileLoading) {
    return (<div className='flex items-center justify-center text-white'>
      Loading...
    </div>)
  }

  return (
    <div className='relative mt-14 text-white flex min-h-[100vh-3.5rem]'>
        <SideBar />

        <div className='relative lg:left-[222px] w-full lg:w-[calc(100vw-222px)] min-h-[100vh-3.5rem] overflow-y-auto overflow-x-hidden'>
          <div className='md:w-11/12 max-w-[1000px] w-full mx-auto py-10'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Dashboard
