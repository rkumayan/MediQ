// About.jsx

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen  backdrop-blur-md  flex mt-5 justify-center ">
      <div className="max-w-3xl backdrop-blur-md rounded-2xl shadow-2xl p-8 ">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">About Our Hospital Queue System</h1>
        <p className="text-gray-700 text-lg mb-4">
          Our virtual queue management system is designed to improve patient experience
          and streamline hospital operations. Built using the MERN stack, the platform
          allows hospitals to manage patient queues digitally and provide real-time updates.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Digital queue management for efficient patient flow.</li>
          <li>link-based access for patients.</li>
          <li>Real-time group chat for communication using </li>
          <li>User-friendly dashboard for staff and patients.</li>
          <li>Scalable architecture with React, Node.js, Express, and MongoDB.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Our Mission</h2>
        <p className="text-gray-700">
          We aim to reduce wait times and enhance healthcare experiences by digitizing
          queue systems. With this project, we envision a future where hospitals can
          operate more efficiently and patients feel more informed and less stressed.
        </p>
      </div>
    </div>
  );
};

export default About;
