import React from 'react'
import ContactForm from '../../contactPage/ContactForm'

const ContactFormSection = () => {

  return (
    <div className='flex flex-col items-center lg:mb-[140px] mb-[100px] justify-center'>
      <h1 className="text-white text-center font-bold text-4xl">
        Get in Touch
      </h1>
      <p className="text-center mt-3 text-[17px] text-richblack-300">
        We'd love to here for you, Please fill out this form.
      </p>
      <div className='mt-5'>
        <ContactForm/>
      </div>
    </div>
  )
}

export default ContactFormSection
