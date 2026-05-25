import { db } from "@/lib/db";

const today = new Date().toISOString().split("T")[0];

export async function getDeliveries() {
  const deliveries = await db.delivered.toArray();
  return deliveries;
}

export async function getDeliveriesToday() {
  const deliveredToday = await db.delivered.where("date").equals(today).first();
  return deliveredToday;
}

export async function incrementDelivery() {
  try {
    const exist = await db.delivered.where("date").equals(today).first();

    if (exist) {
      await db.delivered.update(exist.id!, {
        amount: exist.amount + 1,
      });
    } else {
      await db.delivered.add({
        date: today,
        amount: 1,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function decrementDelivery() {
  const deliveredToday = await db.delivered.where("date").equals(today).first();
  if (!deliveredToday) return;
  const newAmount = deliveredToday.amount - 1;
  try {
    await db.delivered.update(deliveredToday.id!, {
      amount: newAmount,
    });
    if (newAmount < 1) {
      db.delivered.delete(deliveredToday.id);
      console.log("deleted");
    }
  } catch (error) {
    console.error(error);
  }
}

export function updateDeliveryGoal(goal: number) {
  db.settings.put({
    key: "weeklyGoal",
    value: goal,
  });
}

export async function getWeeklyGoal() {
  return await db.settings.get("weeklyGoal");
}
