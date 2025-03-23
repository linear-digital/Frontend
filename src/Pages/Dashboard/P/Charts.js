import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController, // <-- Add this import
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

// Register the necessary components for all chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController // <-- Register the LineController
);

export const LineChart = ({ data2, color }) => {
  const updatedData = {
    ...data2,
    datasets: data2.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
      fill: false,
    })),
  };

  return <Line data={updatedData} options={{ responsive: true }} />;
};

export const MixedChart = ({ data }) => {
  return <Bar data={data} options={{ responsive: true }} />;
};

export const PieChart = ({ data }) => {
  return <Doughnut data={data} options={{ responsive: true }} />;
};