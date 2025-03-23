import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Testimonial from "./Testimonial/Testimonial";
import Services from "./Services/Services";
import Projects from "./Projects/Projects";
import WorkProcess from "./WorkProccess/WorkProcess";
import Education from "./Education/Education";
import Skills from './Skills/Skills'
import Contact from "../Contact/Contact";
import Blog from "../Blog/Blog";
import About from "../About/About";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta
          property="og:title"
          content="Hazrat Ali Personal Portfolio Website"
        />
        <meta
          property="og:description"
          content="MERN Stack Developer || Full-stack Developer || Front-End Developer || React JS Develooper || JavaScript Developer"
        />
      </Helmet>
     
     <div>
     <Banner />
      <Services />
      <Testimonial />
      <Projects />
      <Skills />
      <Education />
      <WorkProcess />
      <Blog />
      <About />
      <Contact />
     </div>
    </div>
  );
};

export default Home;
