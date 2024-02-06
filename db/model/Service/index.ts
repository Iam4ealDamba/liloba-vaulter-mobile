// import { Model, Q, Relation } from "@nozbe/watermelondb";
// import { Associations } from "@nozbe/watermelondb/Model";
// import {
//   text,
//   date,
//   immutableRelation,
//   readonly,
// } from "@nozbe/watermelondb/decorators";
// import UserModel from "../User";
// import { IServiceModelCreate } from "@/utils/interfaces";
// import { StatusCode } from "@/utils/enums";

// export default class ServiceModel extends Model {
//   static table = "services";
//   static associations: Associations = {
//     users: { type: "belongs_to", key: "fk_user_id" },
//   };

//   // @ts-ignore
//   @text("service_name") serviceName: string;
//   // @ts-ignore
//   @text("service_email") serviceEmail: string;
//   // @ts-ignore
//   @text("service_password") servicePassword: string;
//   // @ts-ignore
//   @text("service_img_url") serviceImgUrl: string | null;
//   // @ts-ignore
//   @immutableRelation("users", "fk_user_id") user: Relation<UserModel>;
//   // @ts-ignore
//   @readonly @date("created_at") createdAt: Date;
//   // @ts-ignore
//   @date("updated_at") updatedAt: Date;

//   //#region Class Methods
//   get GetLastUpdate() {
//     if (!this.updatedAt) return null;

//     let day = this.updatedAt.getDate();
//     let month = this.updatedAt.getMonth() + 1;
//     let year = this.updatedAt.getFullYear();
//     let hours = this.updatedAt.getHours();
//     let minutes = this.updatedAt.getMinutes();

//     return `${day}/${month}/${year} à ${hours}:${minutes}`;
//   }
//   //#endregion

//   // #region Model Queries
//   public async Add({
//     service_name,
//     service_email,
//     service_password,
//     service_img_url,
//     fk_user_id,
//   }: IServiceModelCreate) {
//     try {
//       let _service_img_url =
//         (service_img_url == null && null) || service_img_url == undefined
//           ? null
//           : service_img_url;
//       const verify_service = await this.database
//         .get<ServiceModel>(this.table)
//         .query(
//           Q.where("service_email", service_email),
//           Q.where("service_name", service_name),
//           Q.where("service_password", service_password),
//           Q.where("service_img_url", _service_img_url),
//           Q.where("fk_user_id", fk_user_id)
//         );
//       if (verify_service.length) {
//         return {
//           status: StatusCode.Unauthorized,
//           msg: "Erreur: Le service existe déjà.",
//         };
//       }

//       const new_service = await this.database
//         .get<ServiceModel>(this.table)
//         .create((service) => {
//           service.serviceName = service_name;
//           service.serviceEmail = service_email;
//           service.servicePassword = service_password;
//           service.serviceImgUrl = _service_img_url;
//           service.user.id = fk_user_id;
//         });

//       return {
//         status: StatusCode.OK,
//         msg: "Succès: Le service a bien été ajouté.",
//         data: new_service,
//       };
//     } catch (error) {
//       return {
//         status: StatusCode.Bad_Request,
//         msg: `Erreur: ${error}`,
//       };
//     }
//   }
//   // #endregion
// }

import { knex } from "@/db";

knex.schema
  .createTableIfNotExists("services", (table) => {
    table.increments();
    table.string("service_name");
    table.string("service_email");
    table.string("service_password");
    table.string("img_url").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.integer("fk_user_id").references("id").inTable("users");
  })
  .then(() => {
    console.log("services table created");
  });
