import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar';
// import getUserEnrolledCourses from '../../../services/operations/profileApi';
import { useNavigate } from 'react-router-dom';
import { getUserEnrolledCourses } from '../../../services/operations/profileApi';

const EnrolledCourses = () => {

    const {token}  = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    // console.log("enrolledCourses - ", enrolledCourses)
    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
    },[]);


  return (
    <div className='text-white px-4'>

        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        {
            !enrolledCourses ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className='spinner'></div>
            </div>)
            : !enrolledCourses.length ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet</p>)
            : (
                <div className="my-8 text-richblack-5">
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Cards shure hote h ab */}
                    {
                        enrolledCourses.map((course,i)=> (
                            <div className={`flex items-center border border-richblack-700`} key={i}>
                                <div 
                                    className="flex w-[45%] flex-col md:flex-row cursor-pointer gap-4 px-5 py-3"
                                    onClick={() => {
                                        navigate(
                                          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                        )
                                    }}
                                >
                                    <img className="md:h-14 md:w-14 w-30 h-30 rounded-lg object-cover" src={course.thumbnail}/>
                                    <div>
                                        <p className='font-semibold'>{course.courseName}</p>
                                        <p className='text-sm text-richblack-300'>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div className="w-1/4 px-2 py-3">
                                    {course.totalDuration}
                                </div>

                                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                        />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
      
    </div>
  )
}

export default EnrolledCourses
