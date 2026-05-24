import Dexie, { EntityTable } from "dexie";

interface Delivered {
  id: number;
  date: string;
  amount: number;
}

interface WeeklyGoal {
  id: number;
  overtime: number;
  delivered: number;
  remaining: number;
}

export const db = new Dexie("ryderDB") as Dexie & {
  delivered: EntityTable<Delivered, "id">;
  weeklyGoal: EntityTable<WeeklyGoal, "id">;
};

db.version(1).stores({
  delivered: "++id, date",
  weeklyGoal: "++id",
});

export type { Delivered };
