import React from 'react'
import CTAButton from '../homepage/Button';
// import HighlightedText from '../homepage/HighlightedText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({heading, subHeading, btn1, btn2, position, codeblock, codecolor}) => {
  return (
    <div className={`lg:flex ${position} flex-col justify-between mt-20`}>
      
        {/* Section1 */}
        <div className='lg:w-[50%] w-[100%] flex flex-col gap-4'>
            <h2>{heading}</h2>
            <p className='text-richblack-200 text-md font-semibold'>{subHeading}</p>
            <div className='flex flex-row gap-8 mt-7'>
                <CTAButton active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex flex-row items-center gap-2'>
                        <p>{btn1.text}</p>
                        <FaArrowRight />
                    </div>
                </CTAButton>
                <CTAButton active={btn2.active} linkto={btn2.linkto}>
                    <p>{btn2.text}</p>
                </CTAButton>
            </div>

        </div>

        {/* Section2 */}
        <div className='w-[100%] mt-6 border-richblack-800 border-2 lg:w-[450px] p-3 flex flex-row'>

            {/* count */}
            <div className='w-[8%] flex flex-col justify-center text-richblack-500 font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            {/* code animation */}
            <div className='relative'>
                <TypeAnimation 
                    sequence={[codeblock,5000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            color: codecolor,
                            fontSize: "14px",
                            fontWeight: "bold",
                        }
                    }
                />
                {/* <div className="absolute w-[10px] h-[10px] bg-richblack-400 shadow-[100px_100px_100px_rgba(8,_112,_184,_0.7)] top-2 left-3 rounded-full"></div> */}
            </div>

        </div>

    </div>
  )
}

export default CodeBlock
