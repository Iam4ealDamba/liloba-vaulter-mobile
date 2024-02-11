import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

//#region Users
export const users = sqliteTable("users", {
  user_id: integer("user_id").notNull().primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  img_url: text("img_url"),
});

export type User = typeof users.$inferSelect; // return type when queried
export type InsertUser = typeof users.$inferInsert; // insert type
//#endregion

//#region Services
export const services = sqliteTable("services", {
  service_id: integer("service_id")
    .notNull()
    .primaryKey({ autoIncrement: true }),
  service_name: text("service_name").notNull(),
  service_email: text("service_email").notNull(),
  service_password: text("service_password").notNull(),
  service_img_url: text("service_img_url"),
  created_at: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    
  // Foreign Keys
  fk_user_id: integer("fk_user_id")
    .notNull()
    .references(() => users.user_id),
});

export type Service = typeof services.$inferSelect; // return type when queried
export type InsertService = typeof services.$inferInsert; // insert type
//#endregion
