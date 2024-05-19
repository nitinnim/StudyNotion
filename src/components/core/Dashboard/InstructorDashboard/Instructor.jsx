import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileApi";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsSPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const instructorDetails = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorDetails.length) {
        setInstructorData(instructorDetails);
      }
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  // console.log("Instructor Course - ", instructorData)
  // console.log("Courses - ", courses)

  return (
    <div className="text-white w-11/12 mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Hi {user.firstName} 👋</h1>
        <p className="text-richblack-200">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div className="mt-4 flex flex-col gap-y-6">
          <div className="">
            <div className="flex md:flex-row flex-col gap-6">
              <InstructorChart courses={instructorData} />
              <div className="text-white flex flex-col gap-y-3 rounded-md p-6 md:w-[25%] bg-richblack-800">
                <p className="text-xl font-semibold mb-6">Statistics</p>
                <div className="">
                  <p className="text-[20px] text-richblack-300">Total Courses</p>
                  <p className="text-2xl font-semibold">{courses.length}</p>
                </div>
                <div>
                  <p className="text-[20px] text-richblack-300">Total Students</p>
                  <p className="text-2xl font-semibold">{totalStudents}</p>
                </div>
                <div>
                  <p className="text-[20px] text-richblack-300">Total Income</p>
                  <p className="text-2xl font-semibold">{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white rounded-md p-6 bg-richblack-800">
            <div className="flex justify-between items-center font-semibold">
              <p>Your Courses</p>
              <Link to='/dashboard/my-courses'>
                <p className="text-[#FFD60A] text-xs">View all</p>
              </Link>
            </div>
        
            <div className="flex my-4 md:space-x-6 space-x-1 items-start">
              {
                courses.slice(0, 3).map((course, ind) => (
                  <div key={ind} className="md:w-1/3 w-[33%]">
                    <img 
                      src={course?.thumbnail} 
                      alt=""
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="my-2">
                      <p className="text-md text-richblack-100">{course.courseName}</p>
                      <div className="flex md:flex-row flex-col gap-x-2 md:items-center text-richblack-500 text-sm">
                        <p>{course.studentsEnrolled.length} students</p>
                        <p className="md:block hidden">|</p>
                        <p>₹{course.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any course</p>
          <Link to='/dashboard/addCourse'>
            Add Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
