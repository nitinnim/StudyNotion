import React from 'react'
import HighlightedText from '../homepage/HighlightedText'

const Quote = () => {
  return (
    <div className="flex flex-col justify-between w-11/12 max-w-maxContent mx-auto gap-10">
        <div className='lg:h-[130px] h-[70px]'></div>
        <div className='py-5 pb-20 text-xl md:text-4xl font-semibold text-center'>
          <p>We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightedText text={"combines technology "} /> ,
            <span className="text-yellow-50">expertise</span> , and community to create an 
            <span className="text-yellow-50"> unparalleled educational experience.</span> 
          </p>
        </div>
    </div>
  )
}

export default Quote
