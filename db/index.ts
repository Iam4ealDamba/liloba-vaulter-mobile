import { IUserModelRegister } from "@/utils/interfaces";
import ClientExpoSQLite from "@expo/knex-expo-sqlite-dialect";
import Knex from "knex";

export const knex = Knex({
  client: ClientExpoSQLite,
  connection: {
    filename: "MyDB.db",
  },
  useNullAsDefault: true,
});

const GetAllUser = async () => {
  return await knex.select().from<IUserModelRegister>("users");
};

const InsertUser = async (
  username: string,
  email: string,
  password: string,
  img_url?: string
) => {
  await knex("users").insert({
    username: "test",
    email: "test",
    password: "test",
  });
};
