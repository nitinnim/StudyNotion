import React from 'react'
import { IoMdContacts } from "react-icons/io";
import { ImTree } from "react-icons/im";

const Cards = ({cardData, selectedCard, setSelectedCard}) => {
  return (
    <div className="mt-16 relative">
      <div className="flex md:flex-row flex-col relative justify-between gap-16 rounded">
        {
            cardData.map((course, index) => {
                return (

                    <div key={index} className="relative w-[350px] h-[350px]">
                        <div 
                            key={index} 
                            className={`w-[350px] z-10 hover:bg-white group flex cursor-pointer flex-col justify-between relative h-[300px] 
                                ${selectedCard === course.heading ? "bg-white" : "bg-richblack-800"}
                            `}
                            onClick={()=>setSelectedCard(course.heading)}
                        >
                            <div className='p-5'>
                                <div className={`text-[20px] font-semibold group-hover:text-black
                                    ${selectedCard === course.heading ? "text-black" : "text-white"}
                                `}>
                                    {course.heading}
                                </div>
                                <div className='text-richblack-400 mt-3 text-md font-inter'>
                                    {course.description}
                                </div>
                            </div>
                            
                            <div className='pt-2 border-t font-semibold text-richblack-400 border-dashed border-richblack-300'>
                                <div className="flex pb-5 px-5 justify-between items-center">
                                    <div className='flex items-center gap-2'>
                                        <IoMdContacts/>
                                        {course.level}
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <ImTree/>
                                        {course.lessionNumber + " Lessons"}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className={`z-0 w-[350px] h-[300px] bg-[#FFD60A] absolute top-3 left-3
                            ${course.heading === selectedCard ? "block" : "hidden"}
                        `}></div>
                    </div>

                )
            })
        }
      </div>
    </div>
  )
}

export default Cards
