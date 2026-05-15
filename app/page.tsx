"use client";
import { useState } from "react";
import DoughnutChart from "@/components/charts/DoughnutChart";
import ThemeButton from "@/components/interactive/ThemeButton";

export default function Home() {
  const [delivered, setDelivered] = useState<number>(80);
  const [remaining, SetRemaining] = useState<number>(60);
  const [overtime, setOvertime] = useState<number>(0);

  const total = 140;

  const handleAddDelivery = () => {
    if (delivered != total) {
      setDelivered((prev) => (prev += 1));
      SetRemaining((prev) => (prev -= 1));
    } else {
      setOvertime((prev) => (prev += 1));
    }
  };
  const handleRemoveDelivery = () => {
    if (overtime != 0) {
      setOvertime((prev) => (prev -= 1));
    } else {
      setDelivered((prev) => (prev -= 1));
      SetRemaining((prev) => (prev += 1));
    }
  };

  return (
    <main className="flex flex-col justify-center items-center mt-4">
      <h1 className="text-2xl">Delivery Goal</h1>
      <section className="w-[80%] flex mb-[20px]">
        <DoughnutChart
          percentage={Math.round(((delivered + overtime) / total) * 100)}
          labels={["Overtime", "Delivered", "Goal"]}
          datasets={{
            label: "Delivery Goal",
            data: [overtime, delivered, remaining],
            backgroundColor: ["#7b43de", "#7be383", "#dedede"],
          }}
        />
      </section>
      <section className="position: absolute bottom-0 m-[20px] flex flex-row w-[100%] px-[10px] gap-[10px]">
        <ThemeButton
          label="Remove Delivery"
          callback={handleRemoveDelivery}
          variant="danger"
          size="flex"
        />
        <ThemeButton
          label="Add Delivery"
          callback={handleAddDelivery}
          variant="primary"
          size="flex"
        />
      </section>
    </main>
  );
}
