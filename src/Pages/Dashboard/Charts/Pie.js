import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Front End Skills',
    },
  },
};



// export function LineChart({ data2 }) {
//   return <Bar style={{ width: '100%', height: "100%" }} options={{ ...options, plugins: { title: { display: true, text: data2.title } } }} data={data2} />;
// }
export function LineChart({ data2 , color }) {
  const updatedData = {
    ...data2,
    datasets: data2.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: color, // Change the color here
    })),
  };

  return <Bar style={{ width: '100%', height: '100%' }} options={{ ...options, plugins: { title: { display: true, text: data2.title } } }} data={updatedData} />;
}