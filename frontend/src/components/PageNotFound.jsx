import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function PageNotFound() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="flex h-screen items-center justify-center flex-col space-y-4">
      <div className="text-6xl font-bold text-red-600">404</div>
      <div className="text-2xl font-semibold text-green-900">
        Page Not Found
      </div>
      <p className="text-lg text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/login")} // Redirect to home page on button click
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}

export default PageNotFound;
