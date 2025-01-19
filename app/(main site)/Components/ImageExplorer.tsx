'use client'


import React, { useEffect } from "react";

const CloudinaryMediaLibrary = () => {
  useEffect(() => {
    // Dynamically load the Cloudinary script
    const script = document.createElement("script");
    script.src = "https://media-library.cloudinary.com/global/all.js"; // Adjust to the correct Media Library script
    script.async = true;
    script.onload = () => {
      if (window.cloudinary) {
        // Initialize the Cloudinary Media Library
        window.ml = cloudinary.createMediaLibrary(
          {
            cloud_name: "dt0ujnagp", // Replce with your Cloudinary Cloud Name
            api_key: "856293213211614", // Replace with your API Key
            remove_header: false,
            max_files: "1",
            insert_caption: "Insert",
            inline_container: "#widget_container", // The ID of your widget container
            default_transformations: [[]],
            button_class: "myBtn",
            button_caption: "Select Image or Video",
          },
          {
            insertHandler: function (data) {
              data.assets.forEach((asset) => {
                console.log("Inserted asset:", JSON.stringify(asset, null, 2));
                console.log(asset.secure_url)
              });
            },
          },
          document.getElementById("open-btn") // The element that triggers the Media Library
        );
      } else {
        console.error("Cloudinary script not loaded yet.");
      }
    };
    document.body.appendChild(script);

    // Clean up script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="cloudinary-container">
      <button
        id="open-btn"
        className="myBtn bg-blue-500 text-white py-2 px-4 rounded btn"
      >
        Select Image or Video
      </button>
      <div id="widget_container" className="mt-4 h-screen"></div>
    </div>
  );
};

export default CloudinaryMediaLibrary;
