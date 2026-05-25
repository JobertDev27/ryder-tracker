import Dexie, { EntityTable } from "dexie";

interface DeliveredProp {
  id: number;
  date: string;
  amount: number;
}

export const db = new Dexie("ryderDB") as Dexie & {
  delivered: EntityTable<DeliveredProp, "id">;
};

db.version(1).stores({
  delivered: "++id, date",
});

export type { DeliveredProp };
