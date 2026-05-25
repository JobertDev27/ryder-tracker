import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface BarProp {
  label: string[];
  data: number[];
}

export default function BarChart({ label, data }: BarProp) {
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

  return (
    <Bar
      options={options}
      data={{
        labels: label,
        datasets: [
          {
            label: "Delivered",
            data: data,
            backgroundColor: "#23db7c",
          },
        ],
      }}
    />
  );
}
