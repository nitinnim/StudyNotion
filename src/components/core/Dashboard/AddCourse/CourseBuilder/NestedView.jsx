import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import {MdEdit} from 'react-icons/md'
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsSPI';
import { setCourse } from '../../../../../slices/courseSlice';
import ConfirmationModal from '../../../../common/ConfirmationModal';
// import { BiSolidRightArrow } from "react-icons/bi";


const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    
    const [addSubSection, setAddSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({sectionId, courseId: course._id}, token)
        // console.log("PRINTING AFTER DELETE SECTIOn", result);

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({subSectionId, sectionId}, token)
        if(result){
            const updatedSection = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = {...course, courseContent: updatedSection} 
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

  return (
    <div>
        <div id="nestedViewContainer" className="mt-10 rounded-lg bg-richblack-700 p-6 px-8">

            {course?.courseContent?.map((section) => (
                <details key={section._id} open>

                    <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                        <div className='flex gap-x-3 items-center'>
                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                            <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <button
                                onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                            >
                                <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            <button 
                                onClick={()=>{
                                    setConfirmationModal({
                                        text1: "Delete this Section",
                                        text2: "All the lectures in this section wil be deleted",
                                        btn1text: "Delete",
                                        btn2text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })
                                }}
                            >
                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                            <span className="font-medium text-richblack-300">|</span>
                            <BiSolidDownArrow className={`text-xl cursor-pointer text-richblack-300`} />
                        </div>
                    </summary>

                    <div className="px-6 pb-4">

                        {
                            section?.subSection.map((data) => (
                                <div 
                                    key={data?._id} 
                                    className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                    onClick={()=>setViewSubSection(data)}
                                >
                                    <div className='flex gap-x-3 py-2 items-center'>
                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                        <p className="font-semibold text-richblack-50">{data.title}</p>
                                    </div>

                                    <div 
                                        onClick={(e) => e.stopPropagation()}
                                        className='flex gap-x-3 items-center'
                                    >
                                        <button
                                            onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                        >
                                            <MdEdit className="text-xl text-richblack-300" />
                                        </button>
                                        <button
                                            onClick={() => setConfirmationModal({
                                                text1: "Delete this Sub Section",
                                                text2: "selected Lecture will be deleted",
                                                btn1text: "Delete",
                                                btn2text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                btn2Handler: () => setConfirmationModal(null), })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <button
                         className='flex gap-x-5 items-center mt-4 text-yellow-50'
                         onClick={() => setAddSubSection(section._id)}
                        >
                            <IoMdAdd />
                            <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}

        </div>

        {addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />) 
        : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}  />) 
        : editSubSection? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}  />) 
        : (<div></div>)}

        {confirmationModal ? 
            (
                <ConfirmationModal modalData={confirmationModal} />
            )
            : (<div></div>)
        }

    </div>
  )
}

export default NestedView
