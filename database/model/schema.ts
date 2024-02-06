import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        {
          name: "username",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
        {
          name: "password",
          type: "string",
        },
        {
          name: "img_url",
          type: "string",
          isOptional: true,
        },
      ],
    }),
    tableSchema({
      name: "services",
      columns: [
        {
          name: "service_name",
          type: "string",
        },
        {
          name: "service_email",
          type: "string",
        },
        {
          name: "service_password",
          type: "string",
        },
        {
          name: "service_img_url",
          type: "string",
          isOptional: true,
        },
        {
          name: "fk_user_id",
          type: "string",
          isIndexed: true,
        },
        {
          name: "created_at",
          type: "number",
        },
        {
          name: "updated_at",
          type: "number",
        },
      ],
    }),
  ],
});
