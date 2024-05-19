import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import toast from "react-hot-toast";

const ContactForm = () => {
  // -------> USING "REACT-HOOK-FORM" <--------
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    // console.log("Submitted data -> " , data)
    const toastId = toast.loading("Loading...")
    try {
      setLoading(true);
      // toast.loading("Loading...")
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      toast.success("Your message recorded successfully")
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      toast.error("Cannot record your message")
      setLoading(false);
    }
    toast.dismiss(toastId)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-7">
        {/* Name */}
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="flex lg:w-[50%] flex-col gap-1">
            <label
              htmlFor="firstname"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              First Name <span className="text-pink-200">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span className="-mt-1 text-[12px] text-yellow-100">Enter your first name</span>}
          </div>

          <div className="flex lg:w-[50%] flex-col gap-1">
            <label
              htmlFor="lastname"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              Last Name <span className="text-pink-200">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("lastname", { required: true })}
            />
            {errors.lastname && <span className="-mt-1 text-[12px] text-yellow-100">Enter your last name</span>}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <span className="text-pink-200">*</span></label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register("email", { required: true })}
          />
          {errors.email && <span className="-mt-1 text-[12px] text-yellow-100">Enter your email address</span>}
        </div>

        {/* phoneNo */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phonenumber" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Number <span className="text-pink-200">*</span></label>

          <div className="flex items-center gap-2">
            {/* country code */}
            <div>
              <select
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
                className="rounded-[0.5rem] w-[70px] bg-richblack-800 p-[12px] text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              >
                {CountryCode.map((code, index) => (
                  <option key={index} value={code.code} className="text-black">
                    {code.code} -{code.country}
                  </option>
                ))}
              </select>
            </div>

            {/* input field */}
            <input
              type="phonenumber"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: { value: true, message: "Enter Your Phone Number" },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message <span className="text-pink-200">*</span></label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <span className="-mt-1 text-[12px] text-yellow-100">Enter your message here</span>}
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="text-center px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 w-full"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
