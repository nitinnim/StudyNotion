import React from "react";
import ContactForm from "../components/contactPage/ContactForm";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdGlobe } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const ContactUs = () => {
  return (
    <div className="text-white mt-[70px]">
      <div className="pt-20">
        <div className="flex w-11/12 mx-auto max-w-maxContent mb-20 lg:flex-row flex-col justify-between gap-10">
          {/* left */}
          <div className="flex bg-richblack-800 p-8 h-fit flex-col gap-10 rounded-lg lg:w-[40%]">
            <div>
              <div className="flex gap-2 items-center mb-2">
                <IoIosChatboxes color="#999DAA" className="text-3xl" />
                <h3 className="text-[19px] font-bold">Chat on us</h3>
              </div>
              <div className="text-sm text-richblack-200">
                Our friendly team is here to help.
              </div>
              <div className="text-sm text-richblack-200">
                info@studynotion.com
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center mb-2">
                <IoMdGlobe color="#999DAA" className="text-3xl" />
                <h3 className="text-[19px] font-bold">Visit us</h3>
              </div>
              <pre className="text-sm text-richblack-200">{`Come and say hello at our office HQ.\nAkshya Nagar 1st Block 1st Cross,\nRammurthy nagar,Bangalore-560016`}</pre>
            </div>
            <div>
              <div className="flex gap-2 items-center mb-2">
                <IoIosCall color="#999DAA" className="text-3xl" />
                <h3 className="text-[19px] font-bold">Call us</h3>
              </div>
              <div className="text-sm text-richblack-200">
                Mon - Fri From 8am to 5pm
              </div>
              <div className="text-sm text-richblack-200">+123 456 7869</div>
            </div>
          </div>

          {/* right */}
          <div className="lg:w-[60%] border border-richblack-600 p-12 rounded-lg">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-bold">
                  Got a Idea? We've got the skills. Let's team up
                </h2>
                <p className="text-richblack-400">
                  Tell us more about yourself and what you're got in mind.
                </p>
              </div>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto flex max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
          <h2 className="mt-20 font-bold text-center text-4xl text-white">
            Reviews From Other Learners
          </h2>
          <ReviewSlider />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
