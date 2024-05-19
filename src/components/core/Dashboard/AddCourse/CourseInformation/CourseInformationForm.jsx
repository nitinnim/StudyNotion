import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsSPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { MdNavigateNext } from "react-icons/md";

import { COURSE_STATUS } from "../../../../../utils/constants";

import { setStep, setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import ChipInput from "./ChipInput";
import Upload from "../Upload";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const categories = await fetchCourseCategories();
        if (categories.length > 0) {
          setCourseCategories(categories);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  // handle next button click
  const onSubmit = async (data) => {
    // console.log(data);
    if (editCourse) {
      if (isFormUpdated()) {
        console.log("inside Edit");
        const currentValues = getValues();

        {
          /* 
          The line const formData = new FormData() initializes a new instance of the FormData object in JavaScript.
          The FormData object provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be sent with an HTTP request, typically through an XMLHttpRequest or the fetch() API.
        */
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        console.log("Formdata - ", formData);
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // creating the course for the first time
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);
    // console.log("Token - ", token);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup>*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          name="courseTitle"
          placeholder="Enter Course Name"
          {...register("courseTitle", {
            required: true,
          })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Title is required
          </span>
        )}
      </div>

      {/* description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description<sup>*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          name="courseShortDesc"
          placeholder="Enter Course Description"
          {...register("courseShortDesc", {
            required: true,
          })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course description is required
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price<sup>*</sup>
        </label>
        <div className="relative">
          <input
            type="text"
            id="coursePrice"
            name="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course category<sup>*</sup>
        </label>
        <select
          name="courseCategory"
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", {
            required: true,
          })}
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories &&
            courseCategories.map((item, index) => (
              <option
                key={index}
                className="text-white bg-richblack-800"
                value={item?._id}
              >
                {item?.name}
              </option>
            ))}
        </select>
        {errors.courseCategories && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Tags */}
      <ChipInput
        name="courseTags"
        placeholder='Enter tags and press enter'
        label="Tags"
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="courseBenefits"
          id="courseBenefits"
          className="min-h-[140px] form-style w-full"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
        ></textarea>
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Benefits is required
          </span>
        )}
      </div>

      {/* Add requirements */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Save Buttons */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
