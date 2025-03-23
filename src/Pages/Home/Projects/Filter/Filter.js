import React, { useEffect } from 'react';

const Filter = ({ projects, setFiltered, active, setActive }) => {

  useEffect(() => {
    if (active === "all") {
      setFiltered(projects);
    }
    else {
      const filtered = projects.filter((project) => project.category === active);
      setFiltered(filtered);
    }
  }, [active, projects, setFiltered]);

  return (
    <div className="flex justify-center items-center py-12 flex-wrap gap-3">
      <button
        className={
          active === "all"
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 text-white w-[100px] h-[40px]"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800 w-[100px] h-[40px]  py-2 px-4 text-white"
        }
        onClick={() => setActive("all")}
      >
        All
      </button>
      <button
        className={
          active === ""
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 w-[100px] h-[40px] text-white"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800 w-[140px] h-[40px]  py-2 px-4 text-white  sm:mt-0"
        }
        onClick={() => setActive("html")}
      >
        HTML & CSS
      </button>
      <button
        className={
          active === "react"
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 text-white"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800  py-2 px-4 text-white"
        }
        onClick={() => setActive("react")}
      >
        Reactjs
      </button>
      <button
        className={
          active === "redux"
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 text-white"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800  py-2 px-4 text-white"
        }
        onClick={() => setActive("redux")}
      >
        Redux
      </button>
      <button
        className={
          active === "javascript"
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 text-white"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800  py-2 px-4 text-white"
        }
        onClick={() => setActive("javascript")}
      >
        Javascript
      </button>
      <button
        className={
          active === "python"
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 text-white"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800  py-2 px-4 text-white  sm:mt-0"
        }
        onClick={() => setActive("python")}
      >
        Python
      </button>
      <button
        className={
          active === "java"
            ? "rounded mx-2 bg-indigo-900 py-2 px-4 text-white"
            : "rounded mx-2 bg-indigo-700 hover:bg-indigo-800  py-2 px-4 text-white  sm:mt-0"
        }
        onClick={() => setActive("java")}
      >
        Java
      </button>
    </div>
  );
};

export default Filter;