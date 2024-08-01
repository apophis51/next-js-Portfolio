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

    const newformData = new FormData();
    newformData.append('name', formData.name);
    newformData.append('email', formData.email)
    newformData.append('message', formData.message)


    fetch(`/contactEmailAPI`,{
      method: 'POST',
      body: newformData
  }, { cache: 'no-store' })
    setSubmitted(true);
  };

  return (
    <div className="">
      <p className='bg-indigo-700 text-gray-50 rounded-full text-center mt-[100px] pt-5 pb-5 mr-[10%] ml-[10%] text-4xl shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)]'>Contact MalcMind </p>
      {submitted ? (
        <div className='bg-white h-[550px] text-center ml-[10%] mr-[10%] pt-5 rounded-full text-2xl'>
          <p>Thank you for your submission!</p>
        </div>
      ) : (
        <div className="bg-white h-[550px] text-center ml-[10%] mr-[10%] pt-5 rounded-full text-2xl mt-10 shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)]">
        <form onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="name">Name</label>
            <br></br>
            <input
              className='border-black border-2 max-w-[60%]'
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
              className='border-black border-2 max-w-[90%]'
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
              className='border-black border-2 h-[200px] w-[400px] max-w-[90%]'
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
