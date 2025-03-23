import React, { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import Project from "./Project/Project";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  AllProjectsAnimation,
  ContactTextAnimation,
} from "../../../Animations/Animations";
import { projectsAll } from "../../util/data";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState("all");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    setProjects(projectsAll);
    setFiltered(projectsAll);
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
    <>
      <section className="container px-6 mx-auto py-20" id="project" ref={ref}>
        <motion.h2
          initial="hidden"
          animate={viewDiv && "visible"}
          variants={{...ContactTextAnimation}}
          className="mb-4 text-5xl text-center tracking-tight font-extrabold  text-dark dark:text-white sm:leading-none"
        >
         My
          <span className="text-indigo-600 dark:text-indigo-500 pl-3">Project's</span>
        </motion.h2>
        <p
          className="text-xl text-center dark:text-gray-400"
        >
          with love, expertise and pinch of magical ingredients
        </p>
        <Filter
          active={active}
          setActive={setActive}
          projects={projects}
          setFiltered={setFiltered}
        />
        <motion.div
          layout

          initial="hidden"
          animate={viewDiv && "visible"}
          variants={AllProjectsAnimation}

          className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-1 lg:grid-cols-3 place-items-center mt-10"
        >
          {filtered.length > 0 ? (
            <AnimatePresence>
              {filtered.map((project, index) => (
                <Project key={index} number={index} project={project} />
              ))}
            </AnimatePresence>
          ) : (
            <h1 className="text-center text-2xl">No Project Found</h1>
          )}
        </motion.div>
      </section>
    </>
  );
};

export default Projects;
