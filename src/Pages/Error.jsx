import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/");
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="h-[100vh] flex flex-col gap-y-4 items-center justify-center">
      <p className="text-3xl text-white">Error - 404 NOT FOUND</p>
      <div className="flex gap-x-3 items-center justify-center">
        <button 
          className="bg-yellow-5 text-black px-5 py-3 rounded-md font-semibold"
          onClick={() => goToHome()}
        >
          Back to Home  
        </button>  
        <button 
          className="bg-yellow-5 text-black px-5 py-3 rounded-md font-semibold"
          onClick={() => goBack()}
        >
          Go Back  
        </button>  
      </div>      
    </div>
  )
}

export default Error
