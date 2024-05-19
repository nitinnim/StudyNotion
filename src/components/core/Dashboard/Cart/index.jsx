import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);
    const { paymentLoading } = useSelector((state) => state.course)

    if (paymentLoading)
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="spinner"></div>
        </div>
      )
    return (
        <div className="text-white px-4">
            <div className="border-b border-richblack-600">
                <h1 className="text-3xl text-richblack-5">My Whislist</h1>
                <p className="text-richblack-500 mt-6 mb-3 text-sm">{totalItems} Courses in Cart</p>
            </div>
                        
            {total > 0 
            ? (<div className="flex justify-between gap-x-6">
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>)
            : (<p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>)}
        </div>
    )
}