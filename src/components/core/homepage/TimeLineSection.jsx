import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = () => {

    const timeline = [
        {
            logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company",
        },
        {
            logo: Logo2,
            heading: "Responsibility",
            description: "Students will always be our top priority",
        },
        {
            logo: Logo3,
            heading: "Flexibility",
            description: "The ability to switch is an important skills",
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to a solution",
        },
    ]

  return (
    <div>
        
        <div className="flex md:flex-row flex-col gap-16 items-center">

            {/* Left */}
            <div className='flex flex-col gap-12 md:w-[45%]'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div key={index} className='flex flex-row gap-5 items-center'>
                                <div className='bg-white w-[50px] h-[50px] flex items-center justify-center rounded-full'>
                                    <img src={element.logo} alt="" />
                                </div>
                                <div>
                                    <h4 className='font-semibold text-[18px]'>{element.heading}</h4>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Right */}
            <div className='md:w-[60%] z-10 relative'>
                <img src={timeLineImage} className='w-full' alt="" />

                <div className='flex md:flex-row flex-col items-center absolute gap-7 z-20 uppercase bg-caribbeangreen-700 justify-between py-8 left-[50%] translate-x-[-50%] md:translate-y-[-50%] translate-y-[-50%]'>
                    <div className='flex items-center gap-10 px-10 border-r-2 border-caribbeangreen-300'>
                        <h3 className='text-white text-3xl font-bold'>10</h3>
                        <h5 className='text-caribbeangreen-300 text-sm'>Years Experience</h5>
                    </div>
                    <div className='flex items-center gap-5 px-10'>
                        <h3 className='text-white text-3xl font-bold'>250</h3>
                        <h5 className='text-caribbeangreen-300 text-sm'>Types Of Courses</h5>
                    </div>
                </div>
            </div>
            

        </div>

    </div>
  )
}

export default TimeLineSection
