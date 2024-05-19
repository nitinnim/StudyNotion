import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from "react-hot-toast"
import { IoIosArrowBack } from "react-icons/io";
import NestedView from './NestedView';
import {updateSection, createSection} from '../../../../../services/operations/courseDetailsSPI'

const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm();

  useEffect(() => {
    console.log("UPDATED");
  }, [course])

  // OnSubmit form handler
  const onSubmit = async (data) => {

    setLoading(true);
    let result;

    // Edit the section name
    if(editSectionName){
      // console.log("Inisde edit section")
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token)
      // console.log("result ", result);
    }
    // create section
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }

    // now, update the course content
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }

    // make loading false
    setLoading(false);
  }
  

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName', "");
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(sectionId === editSectionName){
      cancelEdit();
      return;
    }
    
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName);

  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goNext = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section")
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return;
    }

    dispatch(setStep(3));
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className='border rounded p-3 border-richblack-600'>
        <div className="flex flex-col mb-6 space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">Section Name <sup className="text-pink-200">*</sup></label>
          <input 
            type="text" 
            id='sectionName'
            name='sectionName'
            placeholder='Add section name'
            className='w-full form-style'
            {...register('sectionName',{required: true})}
          />
          {
            errors.sectionName && (<span className="ml-2 text-xs tracking-wide text-pink-200">
              Section Name is required
            </span>)
          } 
        </div>

        <div className="flex items-end gap-x-4">
          <IconBtn
            type='submit' 
            disabled={loading}
            outline={true}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
          >
            <IoAddCircleOutline className="text-yellow-50" size={20} />
          </IconBtn>
          {
            editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'
              >
                Cancel Edit
              </button>
            )
          }
        </div>

      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex text-white items-center bg-richblack-700 outline-none
           cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold `}
        >
          <IoIosArrowBack />
          Back
        </button>
        <IconBtn
          disabled={loading}
          text='Next'
          onclick={goNext}
        >
          <IoIosArrowForward />
        </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm
