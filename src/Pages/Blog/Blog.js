import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Blog.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ContactTextAnimation } from "../../Animations/Animations";
import { Link } from "react-router-dom";

const Blog = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
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

  const blogAnimation = {
    hidden: {
      x: "-100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5, delay: 1.3, type: "spring" },
    },
  };

  return (
    <>
      {/* Blog Start From Here */}
      <section id="blog" className="container px-6 mx-auto pb-20">
        <motion.h2
          initial="hidden"
          animate={viewDiv && "visible"}
          variants={ContactTextAnimation}
          className="my-12 text-5xl text-center tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none">
          Recent
          <span className="text-indigo-600 dark:text-indigo-500"> Blogs</span>
        </motion.h2>
        <div className="" ref={ref}>
          <Slider {...settings}>
            {/* blog 1  */}
            <motion.div
              initial="hidden"
              animate={viewDiv && "visible"}
              variants={blogAnimation}
            >
              <div className="mx-4 rounded-lg shadow single-blog cursor-pointer relative">
                <a
                  href="https://hazrat-ali.hashnode.dev/html-tips-and-tricks-to-improve-your-web-development-skills"
                  target="_blank"
                  className="blog-text bg-indigo-900 bg-opacity-80 rounded-lg"
                  rel="noreferrer"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-white text-2xl font-semibold text-center">
                    HTML Tips and Tricks to Improve Your Web Development Skills.
                    </h1>
                  </div>
                </a>
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1740788080972/bb88fb9c-0874-47e2-a027-df5e59a13f91.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="blog"
                  className="blog-image w-full h-72 hidden rounded-lg"
                />
              </div>
            </motion.div>
            {/* blog 2  */}
            <motion.div
              initial="hidden"
              animate={viewDiv && "visible"}
              variants={blogAnimation}
            >
              <div className="mx-4 rounded-lg shadow single-blog cursor-pointer relative">
                <a
                  href="https://hazrat-ali.hashnode.dev/master-the-fundamentals-css-basics-for-styling"
                  target="_blank"
                  className="blog-text bg-indigo-900 bg-opacity-80 rounded-lg"
                  rel="noreferrer"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-white text-2xl font-semibold text-center">
                    Mastering CSS: Essential Styling Techniques for Web Design
                    </h1>
                  </div>
                </a>
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1740503966876/1771645c-1bd3-4b95-970c-e612c9f0ef74.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="blog"
                  className="blog-image w-full  h-72 hidden rounded-lg"
                />
              </div>
            </motion.div>
            {/* blog 3 */}
            <motion.div
              initial="hidden"
              animate={viewDiv && "visible"}
              variants={blogAnimation}
            >
              <div className="mx-4 rounded-lg shadow single-blog cursor-pointer relative">
                <a
                  href="https://hazrat-ali.hashnode.dev/handling-asynchronous-code-in-javascript-with-promises"
                  target="_blank"
                  className="blog-text bg-indigo-900 bg-opacity-80 rounded-lg"
                   rel="noreferrer"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-white text-2xl font-semibold text-center">
                    Handling Asynchronous Code in JavaScript with Promises
                    </h1>
                  </div>
                </a>
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1740305421020/3ac1d59f-3859-438c-abdb-e904978314a4.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="blog"
                  className="blog-image w-full h-72 hidden rounded-lg"
                />
              </div>
            </motion.div>
            {/* blog 4  */}
            <motion.div
              initial="hidden"
              animate={viewDiv && "visible"}
              variants={blogAnimation}
            >
              <div className="mx-4 rounded-lg shadow single-blog cursor-pointer relative">
                <a
                  href="https://hazrat-ali.hashnode.dev/fundamental-of-javascript"
                  target="_blank"
                  className="blog-text bg-indigo-900 bg-opacity-80 rounded-lg"
                   rel="noreferrer"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-white text-2xl font-semibold text-center">
                    Fundamental of Javascript
                    </h1>
                  </div>
                </a>
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1740068963081/40f0c002-1174-4f2b-bb04-58e00d17e4a3.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="blog"
                  className="blog-image w-full h-72 hidden rounded-lg"
                />
              </div>
            </motion.div>
            {/* blog 5 */}
            <motion.div
              initial="hidden"
              animate={viewDiv && "visible"}
              variants={blogAnimation}
            >
              <div className="mx-4 rounded-lg shadow single-blog cursor-pointer relative">
                <a
                  href="https://hazrat-ali.hashnode.dev/how-to-build-microservice-architecture-using-nodejs-and-nestjs-for-e-commerce"
                  target="_blank"
                  className="blog-text bg-indigo-900 bg-opacity-80 rounded-lg"
                   rel="noreferrer"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-white text-2xl font-semibold text-center">
                    How to Build Microservice Architecture Using NodeJS and NestJS for E-commerce
                    </h1>
                  </div>
                </a>
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1739962965204/9951e97c-2c5a-4361-b415-6d9e1d82eaf5.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="blog"
                  className="blog-image w-full h-72 hidden rounded-lg"
                />
              </div>
            </motion.div>
          </Slider>
        </div>
        <div className="flex items-center justify-center mt-6 py-4">
          <Link to="/all-blog" className="bg-purple-800 text-white py-2 px-4 rounded text-lg hover:bg-purple-700 transition duration-300">
            View More
          </Link>
        </div>

      </section>
    </>
  );
};

export default Blog;
