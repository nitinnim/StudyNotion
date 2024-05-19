import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'

const Course_card = ({course, Height}) => {

    const [avgReview, setAvgReview] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReview)
        setAvgReview(count);
    },[])
    // console.log("Course - ", course.instructor.firstName)
  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div>
            <div>
                {/* {console.log("print thumbnail path - ", course.thumbnail)} */}
                <img src={course?.thumbnail} alt="Course Thumbnail" className={`${Height} w-full border rounded-xl object-cover`} />
            </div>
            <div className="flex flex-col gap-2 px-1 py-3">
                <p className="text-xl text-richblack-5">{course?.courseName}</p>
                <p className="text-am text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className="flex gap-x-2 items-center">
                    <span className="text-yellow-5">{avgReview || 0}</span>
                    <RatingStars Review_Count={avgReview} />
                    <span className="text-richblack-400">{course?.ratingAndReview?.length} Ratings</span>
                </div>
                <p className="text-xl text-richblack-5">₹{course?.price}</p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_card
