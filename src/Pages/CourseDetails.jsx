import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesApi";
import { fetchCourseDetails } from "../services/operations/courseDetailsSPI";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import { formatDate } from "../services/formatDate";
import CourseDetailCard from "../components/core/Course/CourseDetailCard";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import CourseAccordianBar from "../components/core/Course/CourseAccordianBar";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  useEffect(() => {
    const getFullCourseDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (err) {
        console.log("Cannot fetch course details");
        console.log(err);
      }
    };
    getFullCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReview);
    setAvgReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  if (loading || !courseData) {
    return <div className="spinner"></div>;
  }
  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const {
    // _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails;

  // console.log('Print data - ', courseData);

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Inatructor, you can't buy a course");
      return;
    }
    if (token) {
      dispatch(addToCart(courseData?.data?.courseDetails));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  return (
    <div className="flex lg:mt-14 flex-col text-white">
      <div className="w-full bg-richblack-800 relative">
        <div className="w-11/12 relative py-16 mx-auto lg:max-w-maxContent max-w-maxContentTab">
          {/* Left section */}
          <div className="relative my-2 mb-10 block max-h-[30rem] lg:hidden">
            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            <img
              src={thumbnail}
              alt="course thumbnail"
              className="aspect-auto w-full"
            />
          </div>

          <div className="lg:w-[60%] w-full flex flex-col gap-y-4 ">
            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
              {courseName}
            </p>
            <p className={`text-richblack-200`}>{courseDescription}</p>
            <div className="text-md flex flex-wrap items-center gap-2">
              <span className="text-yellow-25">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span className="text-yellow-25">{`(${ratingAndReview.length} reviews)`}</span>
              <span>{`${studentsEnrolled.length} students enrolled`}</span>
            </div>

            <div>
              <p>
                Created by {`${instructor.firstName} ${instructor.lastName}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-5 text-lg">
              <p className="flex items-center gap-2">
                {" "}
                <BiInfoCircle /> Created at {formatDate(createdAt)}
              </p>
              <p className="flex items-center gap-2">
                {" "}
                <HiOutlineGlobeAlt /> English
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="right-[0rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailCard
              course={courseData?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What y'll learn</p>
            <div className="mt-5">{whatYouWillLearn}</div>
          </div>

          {/* Course Content Section */}
          <div>
            <p className="text-[28px] font-semibold mb-3">Course Content</p>
            <div className="flex flex-col lg:flex-row gap-3 justify-between mb-3">
              <div>
                <span>{courseContent.length} section(s) </span>
                <span>{totalNoOfLectures} lecture(s) </span>
                <span>{courseData.data?.totalDuration} total length</span>
              </div>

              <div>
                <button
                  className="text-yellow-25"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>
            </div>

            {/* Course Accordian */}
            <div>
              {courseContent.map((course, i) => (
                <CourseAccordianBar
                  course={course}
                  key={i}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            <div className="mb-12 mt-6 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg text-caribbeangreen-300">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
        {/* Reviews */}
        <div className="w-11/12 mx-auto flex max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
          <h2 className="mt-20 font-bold text-center text-4xl text-white">
            Reviews From Other Learners
          </h2>
          <ReviewSlider />
        </div>
      </div>

      <Footer />

      {confirmationModal ? (
        <ConfirmationModal modaldata={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CourseDetails;
