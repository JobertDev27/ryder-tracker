import Dexie, { EntityTable } from "dexie";

interface DeliveredProp {
  id: number;
  date: string;
  amount: number;
}

export interface Setting {
  key: string;
  value: string | number | boolean;
}

export const db = new Dexie("ryderDB") as Dexie & {
  delivered: EntityTable<DeliveredProp, "id">;
  settings: EntityTable<Setting, "key">;
};

db.version(1).stores({
  delivered: "++id, date",
  settings: "key",
});

export type { DeliveredProp };
