import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import getCatalogPageData from "../services/operations/getCatalogPageData";
import Course_card from "../components/core/Catalog/Course_card";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    const getCategoryId = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log('Res - ', res?.data?.data);
      const category_Id = res?.data?.data?.filter(
        (ct) =>
          ct.name
            .split(/[^a-zA-Z0-9]/)
            .join("-")
            .toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_Id);
    };
    getCategoryId();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        // console.log("responsive in call - ", res);
        setCatalogPageData(res);
      } catch (err) {
        console.log(err);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="text-richblack-300 mt-14">
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home/Catalog/`}
            <span className="text-yellow-5">
              {catalogPageData?.data.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {" "}
            {catalogPageData?.data?.selectedCategory?.name}{" "}
          </p>
          <p className="max-w-[870px] text-richblack-200"> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
      </div>

      <div className="px-0 mx-auto flex flex-col gap-y-20 mt-14 lg:mt-20 relative w-11/12 lg:max-w-maxContent max-w-maxContentTab">
        {/* section 1 */}
        <div className="mx-auto box-content w-full max-w-maxContentTab lg:max-w-maxContent">
          <div className="section_heading">Courses to get you <span className="text-yellow-50">started</span> </div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
              className={`px-4 py-2
                    ${
                      active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer
                `}
              onClick={() => setActive(1)}
            >
              Most Popular
            </p>
            <p
              className={`px-4 py-2
                    ${
                      active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer
                `}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>

          <div>
            <CourseSlider
              Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* section 2 */}
        <div className="mx-auto box-content w-full max-w-maxContentTab lg:max-w-maxContent">
          <p className="section_heading mb-8">
            Top Courses in <span className="text-yellow-50">{catalogPageData?.data?.selectedCategory?.name}</span> 
          </p>
          <div className="">
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* section 3 */}
        <div>
          <p className="section_heading">Frequently <span className="text-yellow-50">Bought</span> </p>
          <div className="py-8">
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <Course_card
                    course={course}
                    key={index}
                    Height={"h-[400px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
