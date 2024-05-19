import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import VideoDetails from "./VideoDetails";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeSection, setActiveSection] = useState("");
  const [videobarActive, setVideobarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  // {
  //   console.log("tell completed lectures - ", completedLectures);
  // }
  // {
  //   console.log("tell total lectures - ", totalNoOfLectures);
  // }

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      // console.log("courseSectionData - ", courseSectionData)

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
      setVideobarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseEntireData, courseSectionData, location.pathname]);
  // console.log("Inside Video Details Sidebar")

  // useEffect(() => {
  //   console.log("Redux state updated:", completedLectures);
  // }, [completedLectures]);

  return (
    <>
      {/* for buttons */}
      <div className="flex absolute mt-14 py-4 bg-richblack-700 px-5 top-0 md:hidden w-full items-center justify-between ">
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
        >
          <IoIosArrowBack size={30} />
        </button>
        <div>
          <IconBtn
            text={"Add Review"}
            onclick={() => {
              setReviewModal(true);
            }}
          />
        </div>
      </div>

      <div className="flex mb-10 md:mb-0 mx-auto text-white h-fit md:h-[calc(100vh-3.5rem)] mt-14 w-[100vw] md:w-[320px] max-w-[350px] flex-col border border-richblack-700 md:border-r-[1px] md:border-r-richblack-700 bg-richblack-800">
        {/* for buttons and heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* for buttons */}
          <div className="hidden md:flex w-full items-center justify-between ">
            <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            >
              <IoIosArrowBack size={30} />
            </button>
            <div>
              <IconBtn
                text={"Add Review"}
                onclick={() => {
                  setReviewModal(true);
                }}
              />
            </div>
          </div>
          {/* for heading */}
          <div className="flex flex-col py-3">
            <p className="text-richblack-5 text-xl font-bold">
              {courseEntireData?.courseName}
            </p>
            <p className="text-richblack-400 text-sm">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for section and subsection */}
        <div className="">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveSection(section?._id)}
              key={index}
            >
              {/* for section */}
              <div className="px-4 py-5 flex justify-between bg-[#424854]">
                <div>{section?.sectionName}</div>
                <span
                  className={`${
                    activeSection === section?._id ? "rotate-0" : "rotate-180"
                  } transition-all duration-500`}
                >
                  <IoIosArrowUp />
                </span>
              </div>

              {/* for subsection */}
              <div>
                {activeSection === section?._id && (
                  <div className="transition-[height] duration-500 ease-in-out">
                    {section.subSection.map((topic, i) => (
                      <div
                        key={i}
                        className={`flex gap-5 p-5 py-3 ${
                          videobarActive === topic?._id
                            ? "bg-yellow-5 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }`}
                        onClick={() => {
                          navigate(
                            `view-course/:${courseEntireData?._id}/section/:${section?._id}/sub-section/:${topic?._id}`
                          );
                          setVideobarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
