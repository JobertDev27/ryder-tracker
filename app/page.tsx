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
import { refresh } from "next/cache";

export default function Home() {
  const [delivered, setDelivered] = useState<number>(0);
  const [overtime, setOvertime] = useState<number>(0);
  const [dailyDelivered, setDailyDelivered] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [allDeliveries, setAllDeliveries] = useState<DeliveredProp[]>([]);
  const [label, setLabel] = useState<string[]>([]);
  const [recentHistory, setRecentHistory] = useState<number[]>([]);

  const refreshData = async () => {
    // Fetch data from db
    const deliveriesToday = await getDeliveriesToday();
    const weeklyGoal = await getWeeklyGoal();
    const recentDeliveries = await getDeliveries(7);
    const deliveryHistory = await getDeliveries();

    // Normalize values
    const deliveredAmount = deliveriesToday?.amount ?? 0;
    const goalAmount = Number(weeklyGoal?.value) || 100;

    // Calculate overtime
    const overtime =
      deliveredAmount > goalAmount ? deliveredAmount - goalAmount : 0;

    // Update state
    setDailyDelivered(deliveredAmount);
    setGoal(goalAmount);
    setDelivered(deliveredAmount);
    setOvertime(overtime);

    // Update Chart labels
    const labels = recentDeliveries.map((d) =>
      new Date(d.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    );

    while (labels.length < 7) {
      labels.push("TBD");
    }

    const history = recentDeliveries.map((d) => d.amount);

    setLabel(labels);
    setRecentHistory(history);
    setAllDeliveries(deliveryHistory);
  };

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
    };
    getDeliveryData();
    refreshData();
  }, []);

  const handleAddDelivery = async () => {
    await incrementDelivery();
    refreshData();
  };
  const handleRemoveDelivery = async () => {
    await decrementDelivery();
    refreshData();
  };

  return (
    <main className="flex flex-col justify-center items-center mt-4 mx-5 gap-4 mb-15">
      <div className="w-full">
        <h1 className="text-2xl font-bold">DELIVERY GOAL</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
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
                  data: [
                    overtime,
                    delivered,
                    goal > delivered ? goal - delivered : 0,
                  ],
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
                <p>{goal > delivered ? goal - delivered : 0}</p>
              </div>

              <div className="flex justify-between my-2 items-center">
                <p>Goal:</p>
                <p>{goal}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <section className="flex flex-col gap-3 w-full bg-white px-4 py-2 rounded-lg">
          <h2 className="text font-bold">Recent Deliveries</h2>
          <BarChart label={label} data={recentHistory} />
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
      </div>
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
