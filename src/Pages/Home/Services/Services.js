import React, { useEffect, useState } from "react";
import service1 from "./../../../Assets/SvgAnimations/service1.json";
import service2 from "./../../../Assets/SvgAnimations/service2.json";
import service3 from "./../../../Assets/SvgAnimations/service3.json";
import { motion, useAnimation } from "framer-motion";
import Lottie from "react-lottie";
import { useInView } from "react-intersection-observer";
import { serviceTextAnimation } from "../../../Animations/Animations";

const servicesData = [
  {
    id: 1,
    title: "Software Engineer",
    image: "softwore.webp",
    lottieOptions: {
      loop: true,
      autoplay: true,
      animationData: service1,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    description:
      "As a Software Engineer, I develop scalable and efficient software solutions, ensuring high performance, reliability, and seamless functionality.",
    serviceAnimation: {
      hidden: {
        x: "-100vw",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay: .5, type: "spring" },
      },
    },
  },
  {
    id: 3,
    title: "Full Stack Developer",
    lottieOptions: {
      loop: true,
      autoplay: true,
      animationData: service3,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    description:
      "As a Full Stack Developer, I build dynamic and scalable web applications, handling both front-end and back-end development to ensure seamless user experiences and efficient performance.",
    serviceAnimation: {
      hidden: {
        x: "-100vw",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay: .7, type: "spring" },
      },
    },
  },
  {
    id: 1,
    title: "Python Developer",
    image: "/python.gif",
    resume: "/Resume-Python.pdf",
    lottieOptions: {
      loop: true,
      autoplay: true,
      animationData: service1,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    description:
      "As a Python Developer, I build efficient and scalable applications, leveraging Python for web development, automation, and data processing to ensure high performance and reliability.",
    serviceAnimation: {
      hidden: {
        x: "-100vw",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay: .9, type: "spring" },
      },
    },
  }, {
    id: 1,
    title: "Frontend Developer",
    image: "/frontend.gif",
    resume: "/Hazrat-Ali.pdf",
    lottieOptions: {
      loop: true,
      autoplay: true,
      animationData: service1,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    description:
      "As a Front-End developer I have vast experience in making user-friendly web interfaces that help improve user experience and increase customer engagement.",
    serviceAnimation: {
      hidden: {
        x: "-100vw",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay: 1.1, type: "spring" },
      },
    },
  },
  {
    id: 2,
    title: "Backend Developer",
    image: "/backend.gif",
    lottieOptions: {
      loop: true,
      autoplay: true,
      animationData: service2,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    description:
      "As a Backend Developer, I design and optimize server-side applications, manage databases, and ensure seamless API integrations for efficient and scalable web solutions.",
    serviceAnimation: {
      hidden: {
        x: "-100vw",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay: 1.3, type: "spring" },
      },
    },
  },
  {
    id: 1,
    title: "Game Developer",
    image: "/game.gif",
    lottieOptions: {
      loop: true,
      autoplay: true,
      animationData: service1,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    description:
      "As a Game Developer, I create immersive and engaging games, focusing on gameplay mechanics, performance optimization, and interactive experiences across various platforms.",
    serviceAnimation: {
      hidden: {
        x: "-100vw",
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay: 1.5, type: "spring" },
      },
    },
  },



];

const Services = () => {

  const { ref, inView } = useInView({
    threshold: 0.5,
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
    <section className="container px-6 mx-auto pb-20" id="services">
      <motion.h2
        initial="hidden"
        animate={viewDiv && "visible"}
        variants={serviceTextAnimation}
        className="my-12 text-5xl text-center tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none"
      >
        My
        <span className="text-indigo-600 dark:text-indigo-500"> Services</span>
      </motion.h2>
      <div
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center md:items-stretch lg:items-stretch gap-8"
        ref={ref}
      >
        {servicesData.map((service) => (
          <motion.div
          // Gikimiki Program
            initial="hidden"
            animate={viewDiv && "visible"}
            variants={service.serviceAnimation}
            key={service.id}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-6 md:w-60 lg:w-auto lg:h-auto md:h-96"
          >
            {
              service.image ?
                <div className="h-[286px]">
                  <img src={service.image} alt="" />
                </div>
                :
                <div className="h-[286px]">
                  <Lottie
                    options={service?.lottieOptions}
                    height={"100%"}
                    width={"70%"}
                  />
                </div>
            }
            <div className="p-5">
              <h5 className="mb-2 text-2xl md:text-sm lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {service?.title}
              </h5>
              <p className="mb-3 lg:text-base	 font-normal md:text-xs text-gray-700 dark:text-gray-400">
                {service?.description}
              </p>
              <a
                href={service.resume ? service.resume : "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Hire me
                <svg
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
