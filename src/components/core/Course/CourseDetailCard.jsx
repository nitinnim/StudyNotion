import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from 'react-icons/fa'

const CourseDetailCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {token} = useSelector((state) => state.auth)
    const{user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Inatructor, you can't buy a course")
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to add to cart",
            btn1Text: 'Login',
            btn2Text: 'Cancel',
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Copy to clipboard")
    }

  return (
    <div
        className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'
    >
      
        <img 
            src={course.thumbnail} 
            alt="course thumbnail" 
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />
        <p className="space-x-3 pb-4 text-3xl font-semibold">₹{course.price}</p>

        <div className="flex flex-col gap-y-6">
            <button
                className='yellowButton'
                onClick={
                    (user && course?.studentsEnrolled.includes(user?._id)) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse
                }
            >
                {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                }
            </button>
            {
                (!course?.studentsEnrolled.includes(user?._id)) && (
                    <button
                        onClick={handleAddToCart}
                        className='blackButton'
                    >
                        Add to Cart
                    </button>
                )
            }
        </div>

        <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>
            <p className='my-2 text-xl font-semibold '>This Course includes: </p>
            <div>
                {
                    course?.instructions?.map((item, index) => (
                        <div className='flex text-[#06D6A0] gap-2 items-center' key={index}>
                            <BsFillCaretRightFill />
                            <span>{item}</span>
                        </div>
                    ))
                }
            </div>
        </div>

        <div>
            <button
                className='mx-auto flex items-center gap-2 py-6 text-yellow-100'
                onClick={handleShare}
            >
                <FaShareSquare size={15} /> Share
            </button>
        </div>
        

    </div>
  )
}

export default CourseDetailCard
