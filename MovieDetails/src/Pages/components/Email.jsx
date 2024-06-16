import React from 'react';
import emailjs from 'emailjs-com';
import { useState } from 'react';

const Email = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_isxtjx4', // Replace with your EmailJS service ID
      'template_mlp8s1x', // Replace with your EmailJS template ID
      formData,
      'e5h0qEut0CFG3jcDH' // Replace with your EmailJS user ID (public key)
    )
    .then((result) => {
        console.log(result.text);
        alert('Message sent successfully');
    }, (error) => {
        console.log(error.text);
        alert('Failed to send the message, please try again later.');
    });
  };

  return (
    <>
      <h2 className='mt-32 text-center text-3xl font-bold text-gray-800'>Contact Us</h2>
      <div className="contact-form-container mt-10 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
          <div className="mb-6">
            <label className='block text-xl font-semibold mb-2 text-gray-700'>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className='bg-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-stone-950'
              required
            />
          </div>
          <div className="mb-6">
            <label className='block text-xl font-semibold mb-2 text-gray-700'>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='bg-gray-100 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-stone-950'
              required
            />
          </div>
          <div className="mb-6">
            <label className='block text-xl font-semibold mb-2 text-gray-700'>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className='bg-gray-100 p-3 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-stone-950'
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-black text-white p-3 rounded-lg w-full hover:bg-cyan-400 hover:text-black transition duration-300">
              Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Email;
