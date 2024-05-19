import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesApi';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const {total, cart} = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
      const courses = cart.map((course) => course._id);
      // console.log("Bought these course:", courses);
      buyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div className='p-5 mt-6 bg-[#161D29] rounded-lg w-[30%] h-fit'>

        <p className='text-richblack-400'>Total:</p>
        <p className='text-yellow-5 text-2xl'>Rs {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full mt-3 justify-center"}
        />
        
    </div>
  )
}

export default RenderTotalAmount
