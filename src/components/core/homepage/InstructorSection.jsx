import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightedText from "./HighlightedText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import frameImg from "../../../assets/Images/frame.png"

const InstructorSection = () => {
  return (
    <div className="mt-20">
      <div className="md:flex md:flex-row hidden md:gap-24 gap-16 justify-center">
        <div className="md:w-[50%] relative hidden md:block">
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img 
            src={Instructor} 
            alt="instructor" 
            loading="lazy"
            width={558}
            height={504}
            className="absolute top-6 -right-0 z-10" 
          />
        </div>

        <div className="flex md:w-[50%] flex-col md:gap-10 gap-6 justify-center">
          <div className="font-bold text-4xl md:w-[50%] text-white">
            Become an
            <HighlightedText text={"Instructor"} />
          </div>

          <div className="text-richblack-500 text-md font-semibold md:w-[80%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>

          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex flex-row items-center gap-2">
              <p>Start Teaching Today</p>
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>

      <div className="flex md:hidden flex-col gap-6 justify-center">
        <div className="font-bold text-4xl text-white">
          Become an
          <HighlightedText text={"Instructor"} />
        </div>

        <div className="text-richblack-500 text-md font-semibold md:w-[80%]">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </div>

        <div className="md:w-[50%]">
          <img src={Instructor} alt="" className="obejct-contain" />
        </div>

        <div className="mt-10">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex flex-row items-center gap-2">
              <p>Start Teaching Today</p>
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
