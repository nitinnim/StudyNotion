import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/index";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course-Information",
    },
    {
      id: 2,
      title: "Course-Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div>
      <div className="relative mb-2 w-full flex justify-center">
        {steps.map((item) => (
          <>
            <div key={item.id} className="">
              <div
                className={`
                            ${
                              step === item.id
                                ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                : "border-richblack-700 bg-richblue-800 text-richblack-300"
                            }
                            ${step > item.id && "bg-yellow-50 text-yellow-50"}
                            grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                        `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </div>
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div key={item.id} className='flex items-center flex-col gap-y-2 min-w-[100px]'>
            <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
            </p>
          </div>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
