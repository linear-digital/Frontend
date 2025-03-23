import React, { useEffect, useState } from "react";

import "react-circular-progressbar/dist/styles.css";

import { motion, useAnimation } from "framer-motion";
import {
  ContactTextAnimation,
  serviceTextAnimation,
} from "../../../Animations/Animations";
import { useInView } from "react-intersection-observer";
import Slider from "./Slider";

const SkillCard = ({ data, list }) => {
  return (
    <>
      <div
        class="flex justify-between mt-4"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <span class="text-base font-medium text-teal-400 dark:text-white">
          {data.name}
        </span>
      </div>
      <div className="skill-box">
        <div className="skill-bar">
          <span
            className={`skill-per bg-[#6366F1] css`}
            style={{
              width: `${data.pers}%`,
              animationDelay: `${1 + list / 5}s`,
            }}
          >
            <span className="tooltip">{data.pers}%</span>
          </span>
        </div>
      </div>
      {/* <ProgressBar completed={70} maxCompleted={100} /> */}
    </>
  );
};

const Skills = () => {
  const webDev = [
    {
      name: "Html",
      pers: 80,
    },
    {
      name: "CSS",
      pers: 70,
    },
    {
      name: "Bootstrap",
      pers: 60,
    },
    {
      name: "Tailwind",
      pers: 50,
    },
    {
      name: "Javascript",
      pers: 70,
    },
    {
      name: "React",
      pers: 50,
    },
    {
      name: "Next Js",
      pers: 50,
    },
    {
      name: "Express Js",
      pers: 50,
    },
    {
      name: "Node",
      pers: 50,
    },
    {
      name: "MongoDB",
      pers: 50,
    },
    {
      name: "Redux",
      pers: 40,
    },
    {
      name: "Typescript",
      pers: 30,
    },
    {
      name: "Postgress SQL",
      pers: 20,
    },
    {
      name: "Prisma",
      pers: 20,
    },
    {
      name: "Docker",
      pers: 20,
    },
  ];
  const soft = [
    {
      name: "Python",
      pers: 60,
    },
    {
      name: "Django",
      pers: 50,
    },
    {
      name: "C",
      pers: 50,
    },
    {
      name: "C++",
      pers: 50,
    },
    {
      name: "My SQL",
      pers: 30,
    },
    {
      name: "Java",
      pers: 30,
    },
    {
      name: "AWS",
      pers: 10,
    },
    {
      name: "Data Structure",
      pers: 30,
    },
    {
      name: "Algorithm",
      pers: 30,
    },
  ];
  const gameD = [
    {
      name: "Blender",
      pers: 30,
    },
    {
      name: "Unreal Engine",
      pers: 20,
    },
  ];
  const app = [
    {
      name: "React Native",
      pers: 20,
    },
  ];
  const [viewDiv, setViewDiv] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

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
    <div id="skills">
      <motion.h1
        initial="hidden"
        animate={viewDiv && "visible"}
        variants={ContactTextAnimation}
        className="text-5xl mb-3 text-indigo-500 font-bold text-center title"
      >
        Programming Skills
      </motion.h1>
      <h2 className="text-2xl font-bold text-center text-white">
        I Work Hard to Improve My Skills
        <br /> Regularly
      </h2>
      <Slider />
      <motion.div
        initial="hidden"
        animate={viewDiv && "visible"}
        ref={ref}
        variants={serviceTextAnimation}
        class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 mx-auto lg:px-40 px-5"
      >
        {/* Web Development Skills  */}
        {inView && (
          <>
            <div
              class="rounded-lg dark:border-gray-700"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <h1 className="text-center font-semibold text-indigo-500 text-3xl">
                Web Development
              </h1>
              {webDev.map((k, index) => (
                <SkillCard list={index} data={k} key={k.name} />
              ))}
            </div>
            <div
              class="rounded-lg dark:border-gray-700"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <h1 className="text-center text-indigo-500 text-3xl font-semibold">
                Software Engineering
              </h1>
              {soft.map((k, index) => (
                <SkillCard list={index} data={k} key={k.name} />
              ))}
              <h1 className="text-center text-indigo-500 text-3xl mt-5 font-semibold">
                Game Development
              </h1>
              {gameD.map((k, index) => (
                <SkillCard list={index + 9} data={k} key={k.name} />
              ))}{" "}
              <h1 className="text-center text-indigo-500 text-3xl mt-5 font-semibold">
                App Development
              </h1>
              {app.map((k, index) => (
                <SkillCard list={index + 10} data={k} key={k.name} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Skills;

// Skills
