import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const labels = ["05/12", "05/13", "05/14", "05/15", "05/21", "05/22", "05/23"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [7, 21, 16, 23, 17],
      backgroundColor: "#23db7c",
    },
  ],
};

export default function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  };
  return <Bar options={options} data={data} />;
}
