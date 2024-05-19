import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightedText from "../components/core/homepage/HighlightedText";
import CTAButton from "../components/core/homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/homepage/CodeBlock";
import TimeLineSection from "../components/core/homepage/TimeLineSection";
import LearnLanguageSection from "../components/core/homepage/LearnLanguageSection";
import InstructorSection from "../components/core/homepage/InstructorSection";
import ExploreMore from "../components/core/homepage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <div className="mt-14">
      {/* Section 1 */}
      <div className="w-11\12 gap-8 px-3 mb-20 mx-auto justify-between relative flex flex-col items-center max-w-maxContent text-white">
        {/* button */}
        <Link to={"/signup"}>
          <div className="group lg:mt-20 mt-10 p-1 text-richblack-200 mx-auto font-bold w-fit rounded-full bg-richblack-800 transition-all duration-200 hover:scale-95">
            <div className="flex flex-row border-b border-richblack-200 rounded-full items-center gap-2 px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="font-semibold md:text-center text-4xl">
          Empower Your Future with
          <HighlightedText text={"Coding Skills"} />
        </div>

        <div className="text-richblack-200 text-md md:w-[90%] md:text-center font-semibold mt-4">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-8 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* video */}
        <div className="relative my-7 shadow-[0_20px_100px_rgba(8,_112,_184,_0.7)]">
          <div className="z-0 w-full h-full bg-white absolute top-5 left-5"></div>
          <video className="relative" loop muted autoPlay>
            <source src={Banner} />
          </video>
        </div>

        {/* code section 1 */}
        <div className="">
          <CodeBlock
            heading={
              <div className="font-bold text-4xl">
                Unlock your
                <HighlightedText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            position={"lg:flex-row"}
            btn1={{
              text: "Try it Yourself",
              active: true,
              linkto: "/signup",
            }}
            btn2={{
              text: "Learn More",
              active: false,
              linkto: "/login",
            }}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>React & Tailwind CSS Starter Pack</title>\n</head>\n<body>\n<div id="root">\nInside Body\n</div>\n<body />`}
            codecolor={"#F5D245"}
          />
        </div>

        {/* code section 2 */}
        <div className="">
          <CodeBlock
            heading={
              <div className="font-bold text-4xl">
                Start
                <HighlightedText text={"coding"} />
                <HighlightedText text={"in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            position={"lg:flex-row-reverse"}
            btn1={{
              text: "Continue Lesson",
              active: true,
              linkto: "/signup",
            }}
            btn2={{
              text: "Learn More",
              active: false,
              linkto: "/login",
            }}
            codeblock={`import { Route, Routes } from "react-router-dom";\nimport "./App.css";\nimport HomePage from "./Pages/HomePage";\nfunction App() {\nreturn (\n<div className="bg-richblack-900 w-screen">\n<Routes>\n<Route path="/" element={<HomePage/>} />\n</Routes>\n</div>);} />`}
            codecolor={"blue-400"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 px-3 text-richblack-700">
        <div className="my-10 pt-10 md:pt-0">
          <div className="w-11\12 max-w-maxContent relative flex flex-col items-center justify-between gap-6 mx-auto">
            <div className="lg:h-[150px]"></div>

            <div className="flex flex-row gap-6">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  <p>Explore Full Catalog</p>
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
            <div className="lg:h-[50px]"></div>
          </div>
        </div>

        <div className="w-11\12 max-w-maxContent items-center justify-between flex flex-col gap-7 mx-auto">
          <div className="flex md:flex-row flex-col justify-between md:gap-16 gap-6">
            <div className="font-bold text-4xl md:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightedText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col gap-10 md:w-[40%]">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />

          <LearnLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto flex max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        <InstructorSection />

        <h2 className="mt-20 font-bold text-center text-4xl text-white">
          Reviews From Other Learners
        </h2>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
