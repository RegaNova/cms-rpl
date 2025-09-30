import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ title = "Statistik", labels = [], data = [], color = "#0ea5e9" }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        backgroundColor: color + "33",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: color,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { grid: { color: "#e5e7eb" } },
      y: { grid: { color: "#e5e7eb" }, beginAtZero: true },
    },
  };
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="font-semibold text-lg mb-2 text-blue-900">{title}</div>
      <Line data={chartData} options={options} height={80} />
    </div>
  );
}
