import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.resolve("./data");

fs.mkdirSync(dataDir,{
  recursive:true
});

const db = new Database(
  path.join(dataDir,"dominabooks.db")
);

db.pragma("foreign_keys = ON");

export default db;
