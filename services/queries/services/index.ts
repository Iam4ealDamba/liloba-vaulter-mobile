import database from "@/services/db";
import { services } from "@/services/db/schema";
import { StatusCode } from "@/utils/enums";
import { IServiceModelCreate } from "@/utils/interfaces";
import { and, asc, eq } from "drizzle-orm";
import * as Crypto from "expo-crypto";
import ES from "crypto-js";
import CryptoES from "crypto-es";

class ServiceQueries {
  //#region Public methods
  static async ServiceCount() {
    const service_list = await database.query.services.findMany({
      orderBy: [asc(services.service_id)],
    });
    return service_list.length;
  }
  static async GetServices(user_id: number) {
    return await database.query.services.findMany({
      columns: {
        service_id: true,
        service_name: true,
        service_email: true,
        service_password: true,
        service_img_url: true,
        created_at: true,
        updated_at: true,
      },
      where: eq(services.fk_user_id, user_id),
      orderBy: [asc(services.service_id)],
    });
  }
  static async CreateService(
    user_id: number,
    service_name: string,
    service_email: string,
    service_password: string,
    service_img_url?: string
  ) {
    try {
      const query = await database.query.services.findFirst({
        where: and(
          eq(services.fk_user_id, user_id),
          eq(services.service_name, service_name)
        ),
      });
      if (query != undefined) {
        return {
          status: StatusCode.Bad_Request,
          data: "Erreur: Ce service existe déja.",
        };
      }

      let img_url_to_set: string | undefined;

      if (service_img_url == undefined || service_img_url == "") {
        img_url_to_set = "";
      }

      const new_service = await database
        .insert(services)
        .values({
          fk_user_id: user_id,
          service_name: service_name,
          service_email: service_email,
          service_password: service_password,
          service_img_url: img_url_to_set,
        })
        .returning({
          service_id: services.service_id,
          service_name: services.service_name,
          service_email: services.service_email,
          service_password: services.service_password,
          service_img_url: services.service_img_url,
          created_at: services.created_at,
          updated_at: services.updated_at,
        });

      return {
        status: StatusCode.Created,
        data: new_service[0],
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        data: error,
      };
    }
  }
  static async DeleteService(user_id: number, service_id: number) {
    try {
      const query = await database.query.services.findFirst({
        where: and(
          eq(services.service_id, service_id),
          eq(services.fk_user_id, user_id)
        ),
      });
      if (query == undefined) {
        return {
          status: StatusCode.Bad_Request,
          data: "Erreur: Ce service n'existe pas.",
        };
      }

      const deleted_service = await database
        .delete(services)
        .where(
          and(
            eq(services.service_id, service_id),
            eq(services.fk_user_id, user_id)
          )
        )
        .returning({
          service_id: services.service_id,
        });

      if (!deleted_service.length) {
        return {
          status: StatusCode.Bad_Request,
          data: "Erreur: Le service n'a pas été supprimé.",
        };
      }

      return {
        status: StatusCode.OK,
        data: deleted_service[0],
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        data: error,
      };
    }
  }
  static async UpdateService(
    service_id: number,
    service_name: string,
    service_email: string,
    service_password: string,
    service_img_url?: string
  ) {
    try {
      const query = await database.query.services.findFirst({
        where: eq(services.service_id, service_id),
      });
      if (query == undefined) {
        return {
          status: StatusCode.Not_Found,
          data: "Erreur: le service n'existe pas.",
        };
      }

      const updated_service = await database
        .update(services)
        .set({
          service_name: service_name,
          service_email: service_email,
          service_password: service_password,
          service_img_url: service_img_url,
          updated_at: `${new Date().getUTCFullYear()}-${
            new Date().getMonth() < 10
              ? "0" + String(new Date().getMonth() + 1)
              : new Date().getMonth() + 1
          }-${
            new Date().getDate() < 10
              ? "0" + String(new Date().getDate())
              : new Date().getDate()
          } ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        })
        .where(eq(services.service_id, service_id))
        .returning({
          service_id: services.service_id,
          service_name: services.service_name,
          service_email: services.service_email,
          service_password: services.service_password,
          service_img_url: services.service_img_url,
          created_at: services.created_at,
          updated_at: services.updated_at,
        });

      console.log(updated_service[0]);

      return {
        status: StatusCode.OK,
        data: updated_service[0],
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        data: error,
      };
    }
  }
  static async ExportServices(token: number) {
    const services_list = await database.query.services.findMany({
      columns: {
        service_id: true,
        service_name: true,
        service_email: true,
        service_password: true,
        service_img_url: true,
        created_at: true,
        updated_at: true,
      },
      where: eq(services.fk_user_id, token),
      orderBy: [asc(services.service_id)],
    });

    const stringify_data = JSON.stringify(services_list);
    const encrypted_data = CryptoES.AES.encrypt(
      stringify_data,
      "secret key 123"
    ).toString();

    const file_data = {
      data: encrypted_data,
    };
    const to_parse = JSON.stringify(file_data);
    console.log(to_parse);

    return to_parse;
  }
  static async ImportServices(token: number, data: string) {
    try {
      const file_data = JSON.parse(data) as { data: string };
      const bytes = CryptoES.AES.decrypt(file_data.data, "secret key 123");
      const decrypted_data = bytes.toString(CryptoES.enc.Utf8);
      const services_list = JSON.parse(decrypted_data) as {
        service_id: number;
        service_name: string;
        service_email: string;
        service_password: string;
        service_img_url: string;
        created_at: Date;
        updated_at: Date;
      }[];

      const to_add_services = [];
      for (const service_occ of services_list) {
        const query = await database.query.services.findFirst({
          where: and(
            eq(services.service_name, service_occ.service_name),
            eq(services.service_email, service_occ.service_email),
            eq(services.service_password, service_occ.service_password)
          ),
        });

        if (query) {
          continue;
        }
        console.log(service_occ);
        to_add_services.push(service_occ);
      }

      for (const service of to_add_services) {
        await database
          .insert(services)
          .values({
            fk_user_id: token,
            service_name: service.service_name,
            service_email: service.service_email,
            service_password: service.service_password,
            service_img_url: service.service_img_url,
          })
          .then(() => console.log("success"))
          .catch(() => console.log("fail"));
      }

      const query = await database.query.services.findMany({
        columns: {
          service_id: true,
          service_name: true,
          service_email: true,
          service_password: true,
          service_img_url: true,
          created_at: true,
          updated_at: true,
        },
        where: eq(services.fk_user_id, token),
      });

      return {
        status: StatusCode.OK,
        data: query,
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        data: error,
      };
    }
  }
  //#endregion
}

export default ServiceQueries;
