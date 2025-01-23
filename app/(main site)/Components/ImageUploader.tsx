'use client';

import React, { useEffect } from 'react';

const CloudinaryUploadWidget = () => {
  useEffect(() => {
    // Dynamically create and append the script tag
    const script = document.createElement('script');
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    

    // Clean up the script tag on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openUploadWidget = () => {
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dt0ujnagp', // Replace with your Cloudinary cloud name
          uploadPreset: 'xrup10so', // Replace with your upload preset
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Uploaded image:", result.info.secure_url);
          }
        }
      );
      widget.open(); // Open the widget
    } else {
      console.error("Cloudinary script is not loaded yet.");
    }
  };
  

  return (
    <div className="flex justify-center items-center bg-white h-[150px]">
      <button
        onClick={openUploadWidget}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload Image
      </button>
    </div>
  );
};

export default CloudinaryUploadWidget;
