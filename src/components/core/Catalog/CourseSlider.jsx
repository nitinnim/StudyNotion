import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules"

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import Course_card from "./Course_card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
        slidesPerView={3}
        breakpoints={{
          240: {
              slidesPerView: 1,
          },
          
          768: {
              slidesPerView: 3,
          },
        }}
        spaceBetween={25}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
