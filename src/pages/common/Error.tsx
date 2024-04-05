import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Error404: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white h-2/3 rounded-lg flex flex-col items-center justify-center w-2/3">
          <img
            className="w-1/5 my-4"
            src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif"
            alt="error"
          />
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-lg mb-4">
            We couldn't find the page you're looking for.
          </p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Error404;
