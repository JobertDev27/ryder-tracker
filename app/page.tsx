"use client";
import { useState } from "react";
import DoughnutChart from "@/components/charts/DoughnutChart";

export default function Home() {
  const [delivered, setDelivered] = useState<number>(40);
  const [goal, setGoal] = useState<number>(100);

  return (
    <main className="flex flex-col justify-center items-center mt-4">
      <section className="w-[80%] flex">
        <DoughnutChart
          percentage={(delivered / goal) * 100}
          labels={["Delivered", "Goal"]}
          datasets={{
            label: "Delivery Goal",
            data: [delivered, goal],
            backgroundColor: ["#7be383", "#383838"],
          }}
        />
      </section>
    </main>
  );
}
