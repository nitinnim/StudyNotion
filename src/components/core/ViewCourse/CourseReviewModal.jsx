import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createRating } from "../../../services/operations/courseDetailsSPI";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { CgCloseO } from "react-icons/cg";

const CourseReviewModal = ({ setReviewModal }) => {
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse items-center fixed min-h-[calc(100vh-3.5rem)] overflow-hidden justify-center bg-opacity-10 bg-white backdrop-blur-sm inset-0 z-50">
      {/* {console.log("inside review modal")} */}
      <div className="text-white bg-richblack-800 w-11/12 max-w-[700px] border rounded-lg">
        {/* modal header */}
          <div className="flex justify-between bg-richblack-700 rounded-t-lg py-6 px-4">
            <p className="font-bold text-xl">Add Review</p>
            <button onClick={() => setReviewModal(false)} className="font-bold text-3xl"><CgCloseO/></button>
          </div>

        {/* modal body */}
        <div>
          <div className="flex flex-col my-5 items-center justify-center lg:flex-row gap-3">
            <img
              src={user?.image}
              alt="user-image"
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-center md:text-start">Posting Publically</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-4 items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="w-full mt-2 px-10 flex flex-col gap-y-2">
              <label htmlFor="courseExperience" className="text-sm text-richblack-5">Add Your Experience <span className="text-pink-200">*</span> </label>
              <textarea
                type="text"
                id="courseExperience"
                name="courseExperience"
                placeholder="Add Your Experience here"
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] text-black w-full"
              />
              {errors.courseExperience && (
                <span>Please add your experiece</span>
              )}
            </div>

            <div className="flex items-end justify-end my-5 gap-x-3 px-10 w-full">
              <button onClick={() => setReviewModal(false)} className="bg-richblack-400 px-4 text-black py-2 rounded">Cancel</button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
