import { useEffect, useState } from "react";
import "./About.css";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import {
  ContactTextAnimation,
  bannerLeftVariant,
  bannerRightVariant,
} from "../../Animations/Animations";

const About = () => {
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
    <div id="about" ref={ref}>
      <section className="text-gray-700 px-6 body-font dark:text-white">
        <motion.h2 
          initial="hidden"
          animate={viewDiv && "visible"}
          variants={ContactTextAnimation}
        className=" text-5xl text-center tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none mt-5">
          About
          <span className="text-indigo-600 dark:text-indigo-500"> Me</span>
        </motion.h2>

        <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center justify-between">
          <motion.div
            className="lg:max-w-lg lg:w-full md:w-1/2 "
            initial="hidden"
            animate={viewDiv && "visible"}
            variants={bannerLeftVariant}
          >
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/about.png"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={viewDiv && "visible"}
            variants={bannerRightVariant}
            className="lg:flex-grow lg:ml-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center "
          >
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
              Web Application{" "}
              <span className="text-indigo-600 dark:text-indigo-500">
                {" "}
                Developer
              </span>
            </h1>
            <div className="text-[17px]">
              <p className="mb-3  leading-relaxed">
                Hello, I'm Hazrat Ali, a dedicated Software Developer with a
                passion for crafting robust and innovative solutions. My journey
                in the world of technology has been an exciting exploration, and
                I'm thrilled to share a bit about myself with you.
              </p>
              <p className="mb-3  leading-relaxed">
                Proficient in MERN Stack and Python: I specialize in MERN
                (MongoDB, Express.js, React, Node.js) stack development,
                harnessing the power of these technologies to build dynamic and
                scalable applications. Additionally, my proficiency extends to
                Python, where I've had the pleasure of working on diverse
                projects, including those leveraging the Django framework.
              </p>
              <p className="mb-3  leading-relaxed">
                Passion for Problem-Solving: What fuels my enthusiasm for
                software development is the thrill of problem-solving. I thrive
                on challenges, and the dynamic nature of the tech world keeps me
                constantly engaged. My goal is not just to write code but to
                architect solutions that stand the test of time.
              </p>
              <p className="mb-3  leading-relaxed">
                Continuous Learning and Growth: In the fast-evolving landscape
                of technology, I am a firm believer in the importance of
                continuous learning. Staying up-to-date with the latest trends
                and tools allows me to offer cutting-edge solutions to the
                problems I encounter.
              </p>
              <p className="mb-3  leading-relaxed">
                Let's Collaborate: Whether you have a project in mind, wish to
                discuss the latest trends in tech, or just want to connect with
                a fellow enthusiast, I'm always open to collaboration and
                conversation. Feel free to reach out to me via [Your Preferred
                Contact Method].
              </p>
              <p className=" leading-relaxed">
                Thank you for visiting my corner of the web. Let's embark on a
                journey of innovation together!
              </p>
            </div>
            <div className="flex justify-center"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
