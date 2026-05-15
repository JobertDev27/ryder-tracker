import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DoughnutProps } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ ...Props }: DoughnutProps) {
  return (
    <div className="position: relative">
      <Doughnut
        data={{
          labels: Props.labels,
          datasets: [
            {
              ...Props.datasets,
              hoverOffset: 4,
            },
          ],
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[1rem]">
        <p className="text-4xl font-bold">{Props.percentage}%</p>
      </div>
    </div>
  );
}
