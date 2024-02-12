import { and, asc, eq } from "drizzle-orm";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

import { services, users } from "@/services/db/schema";
import { StatusCode } from "@/utils/enums";
import database from "@/services/db";
import { IUserModel } from "@/utils/interfaces";

class UserQueries {
  //#region Private methods
  private static async HashPassword(password: string) {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return digest;
  }
  private static async ComparePassword(password: string, from_db: string) {
    let password_hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    return password_hashed === from_db;
  }
  private static async CreateToken(user_id: number) {
    await SecureStore.setItemAsync("token_user", user_id.toString());
  }
  private static async GetToken() {
    return await SecureStore.getItemAsync("token_user");
  }
  //#endregion

  //#region Public methods
  static async UserCount() {
    const user_list = await database.query.users.findMany({
      orderBy: [asc(users.user_id)],
    });
    return user_list.length;
  }
  static async UserRegister(username: string, email: string, password: string) {
    try {
      const hash_pwd = await this.HashPassword(password);

      const verif_user = await database.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (verif_user != undefined) {
        return {
          status: StatusCode.Unauthorized,
          data: "Erreur: L'adresse email existe déjà.",
        };
      }

      const query = await database
        .insert(users)
        .values({
          username: username,
          email: email,
          password: hash_pwd,
          img_url: "",
        })
        .returning({
          user_id: users.user_id,
          username: users.username,
          email: users.email,
          img_url: users.img_url,
        });
      const new_user = {
        username: query[0].username,
        email: query[0].email,
        img_url: query[0].img_url,
      };
      await this.CreateToken(query[0].user_id);

      return {
        status: StatusCode.Created,
        data: new_user,
      };
    } catch (error: any) {
      return {
        status: StatusCode.Bad_Request,
        data: error.message,
      };
    }
  }
  static async UserLogin(email: string, password: string) {
    try {
      const query = await database.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (query == undefined || !query) {
        return {
          status: StatusCode.Unauthorized,
          data: "Erreur: L'adresse email / mot de passe est invalide.",
        };
      }

      const compare_pwd = await this.ComparePassword(password, query.password);
      if (!compare_pwd) {
        return {
          status: StatusCode.Unauthorized,
          data: "Erreur: L'adresse email / mot de passe est invalide.",
        };
      }

      await this.CreateToken(query.user_id);
      const logged_user: IUserModel = {
        user_id: query.user_id,
        username: query.username,
        email: query.email,
        img_url: query.img_url || "",
      };

      return {
        status: StatusCode.OK,
        data: logged_user,
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        data: error,
      };
    }
  }
  static async GetCurrent(userId: string) {
    try {
      const query = await database.query.users.findFirst({
        where: eq(users.user_id, Number(userId)),
      });
      if (query == undefined) {
        return {
          status: StatusCode.Not_Found,
          data: "Erreur: L'utilisateur n'existe pas.",
        };
      }

      const current_user = {
        username: query.username,
        email: query.email,
        img_url: query.img_url,
      };

      return {
        status: StatusCode.OK,
        data: current_user,
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        data: error,
      };
    }
  }
  static async UserUpdate(username: string, email: string) {
    const token = await this.GetToken();
    if (!token) {
      return {
        status: StatusCode.Unauthorized,
        data: "Erreur: Veuillez vous connecter à nouveau.",
      };
    }

    const query = await database
      .update(users)
      .set({ username: username, email: email })
      .where(eq(users.user_id, Number(token)))
      .returning({
        user_id: users.user_id,
        username: users.username,
        email: users.email,
        img_url: users.img_url,
      });

    return {
      status: StatusCode.OK,
      data: query[0],
    };
  }
  static async UserUpdatePassword(old_password: string, new_password: string) {
    const token = await this.GetToken();
    if (!token) {
      return {
        status: StatusCode.Unauthorized,
        data: "Erreur: Veuillez vous connecter à nouveau.",
      };
    }

    const hash_old_pwd = await this.HashPassword(old_password);
    const verify_user = await database.query.users.findFirst({
      where: and(
        eq(users.user_id, Number(token)),
        eq(users.password, hash_old_pwd)
      ),
    });
    if (verify_user == undefined) {
      return {
        status: StatusCode.Bad_Request,
        data: "Erreur: L'ancien mot de passe est invalide.",
      };
    }

    const hash_pwd = await this.HashPassword(new_password);
    const updated_user = await database
      .update(users)
      .set({ password: hash_pwd })
      .where(eq(users.user_id, Number(token)))
      .returning({
        user_id: users.user_id,
        username: users.username,
        email: users.email,
        img_url: users.img_url,
      });

    return {
      status: StatusCode.OK,
      data: updated_user[0],
    };
  }
  static async UserUpdateImg(img_url: string) {
    const token = await this.GetToken();
    if (!token) {
      return {
        status: StatusCode.Unauthorized,
        data: "Erreur: Veuillez vous connecter à nouveau.",
      };
    }

    const updated_user = await database
      .update(users)
      .set({ img_url: img_url })
      .where(eq(users.user_id, Number(token)))
      .returning({
        user_id: users.user_id,
        username: users.username,
        email: users.email,
        img_url: users.img_url,
      });

    return {
      status: StatusCode.OK,
      data: updated_user[0],
    };
  }
  static async UserLogout() {
    await SecureStore.deleteItemAsync("token_user");
  }
  static async UserDelete() {
    const token = await this.GetToken();
    if (!token) {
      return {
        status: StatusCode.Unauthorized,
        data: "Erreur: Veuillez vous connecter à nouveau.",
      };
    }

    await database
      .delete(services)
      .where(eq(services.fk_user_id, Number(token)));
    await database.delete(users).where(eq(users.user_id, Number(token)));
    return {
      status: StatusCode.OK,
      data: "Succès: L'utilisateur a bien été supprimé.",
    };
  }
  //#endregion
}

export default UserQueries;
