import React, { useEffect, useState } from "react";
import "./Banner.css";
import Lottie from "react-lottie";
import developer from "./../../../Assets/SvgAnimations/developer.json";
import { motion, useAnimation } from "framer-motion";
import {
  bannerLeftVariant,
  bannerRightVariant,
} from "../../../Animations/Animations";
import { useInView } from "react-intersection-observer";
import Typewriter from 'typewriter-effect';
import banner from "../../../../src/lottie/banner.json"

const Banner = () => {

  // lottie 
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: banner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });



  const [viewDiv, setViewDiv] = useState(false);

  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      setViewDiv(true);
    }
    if (!inView) {
      setViewDiv(false);
    }
  }, [inView, animation]);
  return (
    <section ref={ref} className="container lg:px-10 px-5 mx-auto relative">
      <div className="flex flex-col lg:flex-row pt-8 md:pt-16 lg:pt-20  lg:justify-between items-center">
        <motion.div
          initial="hidden"
          animate={viewDiv && "visible"}
          variants={bannerLeftVariant}
          className="lg:w-auto w-full "
        >
          <h3 className="text-[25px] mb-3 text-left tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none">
            Hi There,
          </h3>
          <h2 className="text-4xl text-left tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none">
            I am
            <span className="text-indigo-600 dark:text-indigo-500">
              {" "}
              Hazrat Ali
            </span>
          </h2>
          <h2 className="text-4xl text-left tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none mt-2 flex">
            A
            <span className="text-indigo-600 dark:text-indigo-500 ml-2">
              {" "}
              <Typewriter
                options={{
                  strings: ['Software Engineer', 'Full Stack Web Developer', "Python Developer", "Game Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h2>
          <p className="mt-3 text-left  dark:text-white text-dark sm:mt-5 sm:max-w-xl md:mt-5 text-lg font-light">
            A passionate individual who always thrive to work on end to end
            products which develop sustainable and scalable social and technical
            systems to create impact. I’m currently learning JavaScript more
            advance
          </p>
          <div className="flex flex-col">
            <div className="social-links flex-wrap gap-3 my-8 lg:my-4">
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700"
                target="_blank"
                href="https://www.facebook.com/HAZRATALIML"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700 flex justify-center items-center"
                target="_blank"
                href="https://codeforces.com/profile/Hazrat_Ali9"
              >
                <img src="/Codeforces.webp" className="w-6" alt="" />
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700 flex justify-center items-center"
                target="_blank"
                href="https://www.hackerrank.com/profile/Hazrat_Ali9"
              >
                <img src="/4844527.png" className="w-6" alt="" />
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-white flex justify-center items-center"
                target="_blank"
                href="https://leetcode.com/Hazrat-Ali9"
              >
                <img src="/Leetcode.png" className="w-6" alt="" />
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-white flex justify-center items-center"
                target="_blank"
                href="https://www.codechef.com/users/hazratali9"
              >
                <img src="/Codechef.png" className="w-6" alt="" />
              </a>

              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-white flex justify-center items-center"
                target="_blank"
                href="/"
              >
                <img src="/images/threds.png" className="w-6" alt="" />
              </a>

              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700"
                target="_blank"
                href="https://www.instagram.com/hazrat_ali9mm"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700"
                target="_blank"
                href="https://twitter.com/Hazrat_Ali9"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700"
                target="_blank"
                href="https://github.com/Hazrat-Ali9"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700"
                target="_blank"
                href="https://www.tiktok.com/@hazratali2k63"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a
                rel="noreferrer"
                className="dark:text-white dark:bg-slate-700"
                target="_blank"
                href="https://www.linkedin.com/in/hazratali9/"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>

            </div>
            <button className="rounded w-24 bg-indigo-700 hover:bg-indigo-800 py-2 px-4 text-white">
              {" "}
              <a
                rel="noreferrer"
                target={"_blank"}
                href="/Hazrat-Ali.pdf"
              >
                Resume
              </a>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={viewDiv && "visible"}
          variants={bannerRightVariant}
          className="lg:w-[35%] md:w-3/4 flex justify-center items-center relative"
        >
          {/* GIF Background (Behind Ali's Image) */}
            <div className="absolute inset-0 w-full h-full z-10">
            <Lottie options={defaultOptions} />
          </div>

          {/* Ali's Image (On Top) */}
          <img
            src="/ali.png"
            alt="Hazrat Ali"
            className="w-full h-full object-cover relative z-20"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Banner;
