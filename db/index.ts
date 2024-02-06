import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { migrations } from "./model/migrations";
import { schema } from "./model/schema";
import UserModel from "./model/User";
import ServiceModel from "./model/Service";

const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes,
  // migrations,
  dbName: "lvdb",
  jsi: Platform.OS == "ios" ? true : false,
  onSetUpError: (error) => console.log("onSetUpError", error),
});

export const database = new Database({
  adapter,
  modelClasses: [UserModel, ServiceModel],
});
