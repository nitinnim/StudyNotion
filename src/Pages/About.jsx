import React from 'react'
import HighlightedText from '../components/core/homepage/HighlightedText'
import image1 from '../assets/Images/aboutus1.webp'
import image2 from '../assets/Images/aboutus2.webp'
import image3 from '../assets/Images/aboutus3.webp'
import foundingStory from '../assets/Images/FoundingStory.png'
import Quote from '../components/core/about/Quote'
import CurrentStats from '../components/core/about/CurrentStats'
import LearningGrid from '../components/core/about/LearningGrid'
import ContactFormSection from '../components/core/about/ContactFormSection'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className="text-white">
      {/* section 1 */}
      <section className='mx-auto relative bg-richblack-700'>
        <div className='relative w-11/12 max-w-maxContent mx-auto'>

          <div className="text-4xl pt-[140px] font-bold lg:text-center">
            <h2 className=''>Driving Innovation in Online Education for a
            <HighlightedText text={"Brighter Future"} />  </h2>
          </div>

          <div className='flex justify-center lg:text-center mb-5 md:mb-0 pb-20 mt-5'>
            <p className='lg:text-center lg:w-[70%] text-[17px] text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </div>

          <div className='sm:h-[70px] lg:h-[150px]'></div>

          <div className='grid grid-cols-3 absolute bottom-0 left-[50%] translate-x-[-50%] w-[100%] translate-y-[40%] gap-3 lg:gap-5 justify-between'>
            <img src={image1} alt="" />
            <img src={image2} alt="" />
            <img src={image3} alt="" />
          </div>

        </div>
      </section>

      {/* section 2 */}
      <section className='border-b border-richblack-700'>
        <Quote />
      </section>

      {/* Divider */}
      {/* <div className="my-20 text-richblack-600 border-0">
        <hr />
      </div> */}

      {/* Section 3 */}
      <section>
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-10 justify-between'>
          {/* first section */}
          <div className='flex lg:flex-row flex-col items-center justify-between'>
            {/* left */}
            <div className='lg:w-[50%] flex flex-col gap-7 my-24'>
              <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Founding Story</h2>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
              </p>
            </div>

            {/* right */}
            <div>
              <img src={foundingStory} alt="" className="shadow-[0_0_20px_0] shadow-[#FC6767]" />
            </div>
          </div>

          {/* second section */}
          <div className='flex lg:flex-row flex-col justify-between'>
            {/* left */}
            <div className='lg:my-24 my-20 lg:w-[40%] flex flex-col gap-7'>
              <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Vision</h2>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>
            {/* right */}
            <div className='lg:my-24 lg:mb-0 mb-16 lg:w-[40%] flex flex-col gap-7'>
              <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">Our Mission</h2>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className='bg-[#2C333F]'>
        <CurrentStats/>
      </section>

      {/* section 5 */}
      <section className="mt-20 flex lg:w-11/12 mx-auto max-w-maxContent flex-col justify-between items-center gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* section 6 */}
      <div className="w-11/12 mx-auto flex max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        <h2 className="mt-20 font-bold text-center text-4xl text-white">
          Reviews From Other Learners
        </h2>
        <ReviewSlider />
      </div>

      <Footer />

    </div>
  )
}

export default About
