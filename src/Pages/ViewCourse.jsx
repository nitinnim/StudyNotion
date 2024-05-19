import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsSPI';
import { useDispatch, useSelector } from 'react-redux';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import Footer from '../components/common/Footer'

const ViewCourse = () => {

    const {token} = useSelector((state) => state.auth)
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const [reviewModal, setReviewModal] = useState(false)

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            try{
                const courseData = await getFullDetailsOfCourse(courseId, token)
                dispatch(setCourseSectionData(courseData.courseDetails?.courseContent))
                dispatch(setEntireCourseData(courseData.courseDetails))
                dispatch(setCompletedLectures(courseData.completedVideos))

                let lec=0;
                courseData?.courseDetails?.courseContent.forEach((sec) => {
                    lec += sec.subSection.length;
                })
                dispatch(setTotalNoOfLectures(lec));
            }
            catch(err){
                console.log("error in fetching course specific details")
                console.log(err);
            }
        }
        setCourseSpecificDetails();
    },[])
    // console.log("Inside View Course")
  return (
    <div className="relative">
        <div className="relative flex flex-col-reverse md:flex-row min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className="h-[100vh] flex-1 mt-24 md:mt-0 overflow-auto">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
        <Footer />
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}

export default ViewCourse
