import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from "./schema";

const expo_db = openDatabaseSync("./mydb.sql");
let database = drizzle(expo_db, { schema });

export default database;
