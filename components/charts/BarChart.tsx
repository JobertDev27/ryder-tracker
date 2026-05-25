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

interface BarChartProp {
  dateLabels: string[];
  deliveredAmount: string[];
}

export default function BarChart({
  dateLabels,
  deliveredAmount,
}: BarChartProp) {
  const labels = ["05/12", "05/13", "05/14", "05/15", "05/21", "05/22", "TBD"];
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
        labels: labels,
        datasets: [
          {
            label: "Delivered",
            data: deliveredAmount,
            backgroundColor: "#23db7c",
          },
        ],
      }}
    />
  );
}
