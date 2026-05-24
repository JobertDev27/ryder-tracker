"use client";
import { useState } from "react";
import DoughnutChart from "@/components/charts/DoughnutChart";
import BarChart from "@/components/charts/BarChart";
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
      <div className="w-full">
        <h1 className="text-2xl mb-3 font-bold">DELIVERY GOAL</h1>
      </div>
      <section className="flex justify-evenly items-center w-full bg-white rounded-xl py-2">
        <div className="flex flex-col justify-center mr-[2rem]">
          <h2 className="font-bold mb-2">Weekly Goal</h2>
          <div className="flex gap-[1rem] items-center border-b border-neutral-300 pb-1 justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-[1rem] h-[1rem] bg-[#7b43de] rounded-full"></div>
              <p>overtime:</p>
            </div>
            <p>{overtime}</p>
          </div>
          <div className="flex gap-[1rem] items-center border-b border-neutral-300 pb-1 justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-[1rem] h-[1rem] bg-[#7be383] rounded-full"></div>
              <p>delivered:</p>
            </div>
            <p>{delivered}</p>
          </div>
          <div className="flex gap-[1rem] items-center border-b border-neutral-300 pb-1 justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-[1rem] h-[1rem] bg-[#dedede] rounded-full"></div>
              <p>remaining:</p>
            </div>
            <p>{remaining}</p>
          </div>

          <div className="flex justify-between my-2 items-center">
            <p>Total:</p>
            <p>{total}</p>
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
      <section className="my-5 flex flex-col gap-3 w-full bg-white px-4 py-2 rounded-lg">
        <h2 className="text font-bold">Delivery History</h2>
        <BarChart />
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
