

import { knex } from "@/db";

knex.schema.createTableIfNotExists("users", (table) => {
  table.increments();
  table.string("username");
  table.string("email").unique();
  table.string("password");
  table.string("img_url").nullable();
});
