import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();


  return (
    <div className='w-[70%]'>
    {
        cart.map((course, index) => (
            <div key={index} className='flex gap-x-4 py-6 border-t border-richblack-600 justify-between'>
                <div className='flex gap-x-2'>
                    <img src={course?.thumbnail} width={200} height={200} className='rounded-lg object-cover' />
                    <div className='flex flex-col gap-y-2'>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div className='flex gap-x-2 items-center'>
                            <span>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emtpyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            /> 

                            <span>{course?.ratingAndReview?.length} Ratings</span>

                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-3'>
                    <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className='flex gap-x-2 items-center justify-center p-3 bg-[#161D29] rounded-lg text-[rgb(228,73,73)]'
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>

                    <p className='text-yellow-5 text-center text-2xl'>Rs {course?.price} </p>
                </div>
            </div>
        ))
    }
      
    </div>
  )
}

export default RenderCartCourses
