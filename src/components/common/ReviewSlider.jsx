import React, { useEffect, useState } from "react";
import { ratingsEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Keyboard,
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa";

const ReviewSlider = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviewData(data?.data);
      }
    };
    fetchReviewsData();
  }, []);


  return (
    <div className="text-white my-12 mb-32 flex mx-auto">
      <div className="h-[190px] max-w-xs lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          breakpoints={{
            240: {
                slidesPerView: 1,
            },
            
            768: {
                slidesPerView: 4,
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
          className="w-full"
        >
          {reviewData.map((data, i) => (
            <SwiperSlide
              key={i}
              className="bg-[#161D29] px-3 py-4 flex flex-col gap-y-3"
            >
              <div className="flex items-center gap-x-4">
                <img
                  src={
                    data.user?.image
                      ? data.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${data.user.firstName}`
                  }
                  alt="Profile pic"
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div>
                  <p className="text-[14px] text-[#f1f2ffa9] font-semibold">
                    {data.user.firstName.charAt(0).toUpperCase() +
                      data.user.firstName.slice(1)}{" "}
                    {data.user.lastName.charAt(0).toUpperCase() +
                      data.user.lastName.slice(1)}
                  </p>
                  <p className="text-[13px] text-[#f1f2ff3f]">
                    {data.user.email}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[14px] text-[#f1f2ffa9] font-semibold">
                  {data.course.courseName.charAt(0).toUpperCase() +
                    data.course.courseName.slice(1)}
                </p>
                <p className="text-[14px] text-[#f1f2ff3f]">{data.review}</p>
              </div>

              <div className="flex gap-x-4 items-center">
                <p className="text-[#ffd700]">{data.rating.toFixed(1)}</p>
                <ReactStars
                  count={5}
                  value={data.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
