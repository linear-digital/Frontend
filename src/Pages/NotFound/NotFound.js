import React from 'react';
import { Link } from 'react-router-dom';
import error from "../../../src/lottie/error.json"
import Lottie from "react-lottie";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center dark:bg-[#1A2238]">
      <div className="flex justify-center w-full px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <button className="mt-5">
          <span className="relative inline-block text-sm font-medium text-indigo-400 group active:text-indigo-800 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-indigo-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/">Go Home</Link>
            </span>
          </span>
          </button>
    </section>
  );
};

export default NotFound;
