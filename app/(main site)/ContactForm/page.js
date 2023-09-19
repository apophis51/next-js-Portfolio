
// export default function ContactForm() {
// return (
//     <div className="bg-blue-200 h-[200px] text-white ">
//         <p>helffloffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
//     </div>
// )
    
// }

'use client'

import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here, e.g., sending data to a server
    // For this example, we'll just set the "submitted" state to true
    setSubmitted(true);
  };

  return (
    <div className="">
      <h2 className='bg-indigo-700 text-gray-50 rounded-full text-center mt-[100px] pt-5 pb-5 mr-[180px] ml-[180px] text-4xl'>Contact Malcolm </h2>
      {submitted ? (
        <div className='bg-white h-[550px] text-center ml-[10%] mr-[10%] pt-5 rounded-full text-2xl'>
          <p>Thank you for your submission!</p>
        </div>
      ) : (
        <div className="bg-white h-[550px] text-center ml-[10%] mr-[10%] pt-5 rounded-full text-2xl">
        <form onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="name">Name</label>
            <br></br>
            <input
              className='border-black border-2'
              placeholder="Enter Your Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="email">Email</label>
            <br></br>
            <input
              className='border-black border-2'
              placeholder='Enter Your Email'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="message">Message:</label>
            <br></br>
            <textarea
              className='border-black border-2 h-[200px] w-[400px]'
              placeholder='Enter Your Message'
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <br></br>
          </div>
          <button className='bg-indigo-700 text-white p-5 rounded-full' type="submit">Submit</button>
        </form>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
