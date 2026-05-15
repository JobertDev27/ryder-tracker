"use client";
import { useState } from "react";
import DoughnutChart from "@/components/charts/DoughnutChart";
import DefaultButton from "@/components/interactive/ThemeButton";

export default function Home() {
  const [delivered, setDelivered] = useState<number>(40);
  const [goal, setGoal] = useState<number>(100);

  const handleAddDelivery = () => setDelivered((prev) => (prev += 1));

  return (
    <main className="flex flex-col justify-center items-center mt-4">
      <section className="w-[80%] flex">
        <DoughnutChart
          percentage={(delivered / goal) * 100}
          labels={["Delivered", "Goal"]}
          datasets={{
            label: "Delivery Goal",
            data: [delivered, goal],
            backgroundColor: ["#7be383", "#dedede"],
          }}
        />
      </section>
      <DefaultButton label="Add Delivery" callback={handleAddDelivery} />
    </main>
  );
}
