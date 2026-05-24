import Dexie from "dexie";

export const db = new Dexie("ryderDB");
db.version(1).stores({
  delivered: "++id, date, amount",
});
