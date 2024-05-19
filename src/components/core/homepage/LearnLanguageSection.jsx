import React from 'react'
import HighlightedText from './HighlightedText'
import CTAButton from './Button'
import Image1 from '../../../assets/Images/Know_your_progress.png'
import Image2 from '../../../assets/Images/Compare_with_others.png'
import Image3 from '../../../assets/Images/Plan_your_lessons.png'


const LearnLanguageSection = () => {
  return (
    <div className="mt-[150px] mb-20">
      <div className="flex flex-col justify-between gap-6">

        <div className='font-bold md:mx-auto text-4xl'>
          Your swiss knife for 
          <HighlightedText text={"learning any language"}/>
        </div>

        <div className='text-richblack-600 md:mx-auto text-md md:text-center w-full md:w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex md:flex-row md:mt-0 mt-10 flex-col items-center justify-center'>
          <img src={Image1} alt="" className='object-contain md:-mr-32'/>
          <img src={Image2} alt="" className='object-contain md:mt-0 -mt-12'/>
          <img src={Image3} alt="" className='object-contain md:-ml-36 md:mt-0 -mt-[74px]'/>
        </div>

        <div className='flex justify-center'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearnLanguageSection
