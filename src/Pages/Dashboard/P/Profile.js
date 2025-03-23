import React from "react";
import { MixedChart } from "./Charts";
import { Radar, Bar, PolarArea } from "react-chartjs-2";
import { LineChart } from "../Charts/Pie";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

// Dark mode colors
const darkModeColors = {
  background: "#1a1a1a",
  text: "#ffffff",
  gridLines: "#333333",
  tooltipBackground: "#333333",
  tooltipText: "#ffffff",
};

// RadarChart Component
const RadarChart = ({ data }) => {
  const options = {
    scales: {
      r: {
        angleLines: {
          color: darkModeColors.gridLines,
        },
        grid: {
          color: darkModeColors.gridLines,
        },
        pointLabels: {
          color: darkModeColors.text,
        },
        ticks: {
          color: darkModeColors.text,
          backdropColor: darkModeColors.background,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkModeColors.text,
        },
      },
      tooltip: {
        backgroundColor: darkModeColors.tooltipBackground,
        titleColor: darkModeColors.tooltipText,
        bodyColor: darkModeColors.tooltipText,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

// BarChart Component
const BarChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        grid: {
          color: darkModeColors.gridLines,
        },
        ticks: {
          color: darkModeColors.text,
        },
      },
      y: {
        grid: {
          color: darkModeColors.gridLines,
        },
        ticks: {
          color: darkModeColors.text,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkModeColors.text,
        },
      },
      tooltip: {
        backgroundColor: darkModeColors.tooltipBackground,
        titleColor: darkModeColors.tooltipText,
        bodyColor: darkModeColors.tooltipText,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

// PolarAreaChart Component
const PolarAreaChart = ({ data }) => {
  const options = {
    scales: {
      r: {
        grid: {
          color: darkModeColors.gridLines,
        },
        ticks: {
          color: darkModeColors.text,
          backdropColor: darkModeColors.background,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkModeColors.text,
        },
      },
      tooltip: {
        backgroundColor: darkModeColors.tooltipBackground,
        titleColor: darkModeColors.tooltipText,
        bodyColor: darkModeColors.tooltipText,
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

// Profile Component
const Profile = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 p-8 gap-6">
      {/* Mixed Chart */}
      <div className="w-full text-white rounded-lg overflow-hidden p-3 max-h-96 min-h-[300px]">
        <MixedChart data={frontEnd} />
      </div>

      {/* Radar Chart */}
      <div className="w-full text-white rounded-lg overflow-hidden p-3 max-h-96 min-h-[300px]">
        <RadarChart data={backEnd} />
      </div>

      <div className="w-full text-white rounded-lg overflow-hidden p-3 max-h-96 min-h-[300px]">
        <PolarAreaChart data={app} />
      </div>

      {/* Line Chart (Blue) */}
      <div className="w-full text-white rounded-lg overflow-hidden p-3 max-h-96 min-h-[300px]">
        <LineChart data2={software} color={"blue"} />
      </div>

      {/* Bar Chart */}
      <div className="w-full text-white rounded-lg overflow-hidden p-3 max-h-96 min-h-[300px]">
        <BarChart data={game} />
      </div>

      
    </div>
  );
};

export default Profile;

// Data definitions remain the same
const frontEnd = {
  labels: [
    "Typescript",
    "Redux",
    "Next JS",
    "Tailwind CSS",
    "React JS",
    "Bootstrap",
    "Javascript",
    "CSS",
    "HTML"
  ],
  datasets: [
    {
      type: "bar",
      label: "Front End",
      data: [40, 40, 50, 50, 60, 60, 70, 70, 80],
      backgroundColor: "rgba(255, 206, 86, 0.5)",
    },
    {
      type: "line",
      label: "Front End",
      data: [40, 40, 50, 50, 60, 60, 70, 70, 80],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
    },
  ],
  title: "Front End Skills",
};

const backEnd = {
  labels: [
    "Node JS",
    "Express JS",
    "MongoDB",
    "Postgress Sql",
    "Prisma",
    "Docker",
  ],
  datasets: [
    {
      label: "Back End",
      data: [50, 50, 50, 30, 30, 20],
      backgroundColor: "rgba(80, 200, 255, 0.5)",
      borderColor: "rgba(0, 0, 0, 0)",
      borderWidth: 1,
    },
  ],
  title: "Back End Skills",
};

const software = {
  labels: [
    "Python",
    "Django",
    "C",
    "C++",
    "My SQL",
    "JAVA",
    "AWS",
    "Data Structure",
    "Algorithm",
  ],
  datasets: [
    {
      label: "Softwore Development",
      data: [60, 50, 50, 50, 30, 30, 10, 10, 10, 100],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
  title: "Softwore Development Skills",
};

const game = {
  labels: ["Blender", "Ubreal Engine"],
  datasets: [
    {
      label: "Game Development",
      data: [40, 60, 100],
      backgroundColor: "rgba(85, 90, 255, 0.8)",
    },
  ],
  title: "Game Development Skills",
};

const app = {
  labels: ["React Native"],
  datasets: [
    {
      label: "App Development",
      data: [40, 60, 100],
      backgroundColor: ["#03045e", "#ca6702", "#3c096c"],
    },
  ],
  title: "App Development Skills",
};