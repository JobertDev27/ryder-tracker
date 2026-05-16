import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { DoughnutProps } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ ...Props }: DoughnutProps) {
  return (
    <div className="position: relative">
      <Doughnut
        className={Props.className}
        data={{
          labels: Props.labels,
          datasets: [
            {
              ...Props.datasets,
              hoverOffset: 4,
            },
          ],
        }}
        options={{ cutout: "70%", plugins: { legend: { display: false } } }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <p className="font-bold">{Props.percentage}%</p>
        <p className="text-sm">Completed</p>
      </div>
    </div>
  );
}
