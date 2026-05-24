import Dexie, { EntityTable } from "dexie";

interface Delivered {
  id: number;
  date: string;
  amount: number;
}

export const db = new Dexie("ryderDB") as Dexie & {
  delivered: EntityTable<Delivered, "id">;
};

db.version(1).stores({
  delivered: "++id, date, amount",
});

export type { Delivered };
