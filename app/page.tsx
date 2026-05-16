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
    <main className="flex flex-col justify-center items-center mt-4 mx-5">
      <h1 className="text-2xl">Delivery Goal</h1>
      <section className="flex justify-evenly w-full bg-white rounded-xl py-2">
        <div className="flex flex-col justify-center mr-[2rem]">
          <h2 className="font-bold">WEEKLY GOAL</h2>
          <div className="flex gap-[1rem] items-center">
            <div className="w-[1rem] h-[1rem] bg-[#7b43de]"></div>
            <p>Overtime: {overtime}</p>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div className="w-[1rem] h-[1rem] bg-[#7be383]"></div>
            <p>Delivered: {delivered}</p>
          </div>
          <div className="flex gap-[1rem] items-center">
            <div className="w-[1rem] h-[1rem] bg-[#dedede]"></div>
            <p>Remaining: {remaining}</p>
          </div>

          <div className="border-t-1 my-2">
            <p>TOTAL: {total}</p>
          </div>
        </div>
        <div>
          <DoughnutChart
            className="h-15"
            percentage={Math.round(((delivered + overtime) / total) * 100)}
            labels={["Overtime", "Delivered", "Goal"]}
            datasets={{
              label: "Delivery Goal",
              data: [overtime, delivered, remaining],
              backgroundColor: ["#7b43de", "#7be383", "#dedede"],
            }}
          />
        </div>
      </section>
      <section className="position: absolute bottom-0 m-4 flex flex-row w-full px-3 gap-2">
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
