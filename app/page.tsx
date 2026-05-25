"use client";
import { useState, useEffect } from "react";
import DoughnutChart from "@/components/charts/DoughnutChart";
import BarChart from "@/components/charts/BarChart";
import ThemeButton from "@/components/interactive/ThemeButton";
import {
  decrementDelivery,
  getDeliveries,
  getDeliveriesToday,
  getWeeklyGoal,
  incrementDelivery,
  updateDeliveryGoal,
} from "@/utils/database";

import { DeliveredProp } from "@/lib/db";

export default function Home() {
  const [delivered, setDelivered] = useState<number>(0);
  const [overtime, setOvertime] = useState<number>(0);
  const [dailyDelivered, setDailyDelivered] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [allDeliveries, setAllDeliveries] = useState<DeliveredProp[]>([]);
  const [label, setLabel] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const getDeliveryData = async () => {
      const todayDelivered = await getDeliveriesToday();
      const weeklyGoal = await getWeeklyGoal();

      setAllDeliveries(await getDeliveries());
      setDailyDelivered(todayDelivered?.amount || 0);

      if (weeklyGoal) {
        if (typeof weeklyGoal?.value === "number") {
          setGoal(weeklyGoal.value);
        }
      } else {
        const goalPrompt = prompt("What is your weekly goal?");
        updateDeliveryGoal(Number(goalPrompt));
        setGoal(Number(goalPrompt));
      }

      const del = await getDeliveries(7);
      let tempLabel: string[] = del.map((d) =>
        new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
      while (tempLabel.length < 7) {
        tempLabel.push("TBD");
      }

      const tempData: number[] = del.map((d) => d.amount);

      setLabel(tempLabel);
      setData(tempData);
    };
    getDeliveryData();
  }, []);

  const handleAddDelivery = async () => {
    setDailyDelivered((prev) => prev + 1);
    if (delivered != goal) {
      setDelivered((prev) => prev + 1);
    } else {
      setOvertime((prev) => prev + 1);
    }
    await incrementDelivery();
    setAllDeliveries(await getDeliveries());
  };
  const handleRemoveDelivery = async () => {
    if (dailyDelivered < 1) return alert("Cannot go below 0");
    setDailyDelivered((prev) => prev - 1);
    if (overtime != 0) {
      setOvertime((prev) => prev - 1);
    } else {
      setDelivered((prev) => prev - 1);
    }
    await decrementDelivery();
    setAllDeliveries(await getDeliveries());
  };

  return (
    <main className="flex flex-col justify-center items-center mt-4 mx-5 gap-4 mb-15">
      <div className="w-full">
        <h1 className="text-2xl font-bold">DELIVERY GOAL</h1>
      </div>
      <section className="bg-white flex flex-col items-center justify-center px-4 py-3 w-full rounded-lg">
        <div className="w-full">
          <h2 className="font-bold">Delivered Today</h2>
        </div>
        <p className="text-6xl font-bold my-5">{dailyDelivered}</p>
      </section>
      <section className="flex flex-col w-full bg-white rounded-xl py-2 px-4">
        <h2 className="font-bold mb-3">Weekly Delivered</h2>
        <div className="flex justify-between w-full gap-8">
          <div>
            <DoughnutChart
              className="h-15"
              percentage={Math.round(((delivered + overtime) / goal) * 100)}
              labels={["Overtime", "Delivered", "Goal"]}
              datasets={{
                label: "Delivery Goal",
                data: [overtime, delivered, goal - delivered],
                backgroundColor: ["#7b43de", "#7be383", "#dedede"],
              }}
            />
          </div>
          <div className="flex flex-col justify-center flex-1">
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
              <p>{goal - delivered}</p>
            </div>

            <div className="flex justify-between my-2 items-center">
              <p>Goal:</p>
              <p>{goal}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-3 w-full bg-white px-4 py-2 rounded-lg">
        <h2 className="text font-bold">Recent Deliveries</h2>
        <BarChart label={label} data={data} />
      </section>
      <section className="flex flex-col gap-3 w-full bg-white px-4 py-2 rounded-lg pb-10">
        <h2 className="text font-bold">Delivery History</h2>
        <div className="display flex-col">
          {allDeliveries.length > 0 ? (
            <>
              <div className="flex w-full justify-between border-b border-neutral-400">
                <p>Delivered</p>
                <p>Date</p>
              </div>
              {allDeliveries.map((del, i) => {
                return (
                  <div key={i} className="flex w-full justify-between">
                    <p>{del.amount}</p>
                    <p>{del.date}</p>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex items-center justify-center font-bold">
              <p>No Data Available Yet</p>
            </div>
          )}
        </div>
      </section>
      <section className="position: absolute bottom-0 m-4 flex flex-row w-full px-3 gap-2 fixed">
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
