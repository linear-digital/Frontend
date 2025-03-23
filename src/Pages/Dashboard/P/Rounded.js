import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green"],
  datasets: [
    {
      label: "Dataset",
      data: [30, 20, 25, 25],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
      borderRadius: 10,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Rounded = () => {
  return <Doughnut data={data} options={options} />;
};

export default Rounded;
