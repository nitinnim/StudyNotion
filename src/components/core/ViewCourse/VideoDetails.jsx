import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsSPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css"; // import css
import { FaPlay } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowBack } from "react-icons/io";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();

  const {
    courseSectionData,
    courseEntireData,
    toalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const setVideoSpecificData = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredSection = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        // console.log("filteredSection - ", filteredSection[0].subSection)
        const filteredVideoData = filteredSection?.[0].subSection.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificData();
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (c) => c._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((c) => c._id === subSectionId);

    if (currentSubSectionIndex === 0 && currentSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (c) => c._id === sectionId
    );
    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((c) => c._id === subSectionId);

    if (
      currentSubSectionIndex === noOfSubSection - 1 &&
      currentSectionIndex === courseSectionData.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNext = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (c) => c._id === sectionId
    );
    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((c) => c._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSection - 1) {
      // same section mein next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // next section mein 1 sub-section video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrev = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (c) => c._id === sectionId
    );
    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((c) => c._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      // same section mein prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // prev section mein last sub-section video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    console.log("inside lecture completion lecture handler");
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };
  // console.log("Inside Video Details")
  return (
    <div className="w-full mt-9 md:mt-12 text-white">
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <div className="px-0 md:px-5">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            // autoPlay={true}
            onEnded={() => setVideoEnded(true)}
            src={videoData.videoUrl}
            className="flex items-center justify-center"
          >
            <BigPlayButton position="center" />
            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
              >
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                )}

                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />

                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrev}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNext}
                      className="blackButton"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>

          <div className="px-5">
            <h1 className="my-5 text-3xl font-semibold text-richblack-5">
              {videoData?.title}
            </h1>
            <p className="mb-3 pt-2">{videoData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
