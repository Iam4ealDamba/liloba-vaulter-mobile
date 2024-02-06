import { Model, Q, Query } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";
import { children, text, writer } from "@nozbe/watermelondb/decorators";
import * as Crypto from "expo-crypto";

import {
  IProfileModify,
  IProfilePasswordModify,
  IUserModelEditPassword,
  IUserModelRegister,
} from "@/utils/interfaces";
import ServiceModel from "../Service";
import { StatusCode } from "@/utils/enums";

export default class UserModel extends Model {
  static table = "users";
  static associations: Associations = {
    services: { type: "has_many", foreignKey: "fk_user_id" },
  };

  // @ts-ignore
  @text("username") username: string;
  // @ts-ignore
  @text("email") email: string;
  // @ts-ignore
  @text("password") password: string;
  // @ts-ignore
  @text("img_url") imUrl: string | null;
  // @ts-ignore
  @children("services") services: Query<ServiceModel>;

  // #region Class Methods
  async GetUserProfile(id: string, email: string) {
    const user = await this.database
      .get<UserModel>(this.table)
      .query(Q.where("id", id), Q.where("email", email))
      .then((users) => {
        return users[0];
      })
      .catch(() => {
        return {
          status: StatusCode.Unauthorized,
          msg: "Erreur: L'email/mot de passe ne correspond pas.",
        };
      });

    if (!user) return null;
    return {
      status: StatusCode.OK,
      msg: "Succès: La requête a bien été effectuée.",
      data: user,
    };
  }
  async HashPassword(password: string) {
    let salt = Crypto.CryptoDigestAlgorithm.SHA256;
    let hash = await Crypto.digestStringAsync(salt, password);
    return hash;
  }
  async ComparePassword(password: string, hash: string) {
    let pwd_to_hash = await this.HashPassword(password);
    return pwd_to_hash === hash;
  }
  // #endregion

  //#region Model Queries
  // @ts-ignore
  @writer async Register({
    username,
    email,
    password,
    img_url,
  }: IUserModelRegister) {
    try {
      const verify_user = await this.database
        .get<UserModel>(this.table)
        .query(Q.where("email", email))
        .fetch();

      if (verify_user.length) {
        return {
          status: StatusCode.Unauthorized,
          msg: "Erreur: L'utilisateur existe déjà.",
          data: null,
        };
      }

      let hash_pwd = await this.HashPassword(password);
      let _img_url =
        (img_url == null && null) || img_url == undefined ? null : img_url;

      const register_user = await this.database
        .get<UserModel>(this.table)
        .create((user) => {
          user.username = username;
          user.email = email;
          user.password = hash_pwd;
          user.imUrl = _img_url;
        });

      const new_user = {
        id: register_user.id,
        username: register_user.username,
        email: register_user.email,
        img_url: register_user.imUrl,
      };

      return {
        status: StatusCode.Created,
        msg: "Succès: L'utilisateur a bien été inscrit.",
        data: new_user,
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        msg: `Erreur: ${error}`,
        data: null,
      };
    }
  }
  // @ts-ignore
  @writer async Login({ email, password }: IUserModelLogin) {
    try {
      const verify_user = await this.database
        .get<UserModel>(this.table)
        .query(Q.where("email", email))
        .fetch()
        .then((users) => {
          return users[0];
        })
        .catch(() => {
          return null;
        });

      if (!verify_user) {
        return {
          status: StatusCode.Unauthorized,
          msg: "Erreur: l'email/mot de passe ne correspond pas.",
          data: null,
        };
      }

      const verify_pwd = await this.ComparePassword(
        password,
        verify_user.password
      );
      if (!verify_pwd) {
        return {
          status: StatusCode.Unauthorized,
          msg: "Erreur: l'email/mot de passe ne correspond pas.",
          data: null,
        };
      }

      const current_user = {
        id: verify_user.id,
        username: verify_user.username,
        email: verify_user.email,
        img_url: verify_user.imUrl,
      };

      return {
        status: StatusCode.OK,
        msg: "Succès: L'utilisateur a bien été connecté.",
        data: current_user,
      };
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        msg: `Erreur: ${error}`,
        data: null,
      };
    }
  }
  // @ts-ignore
  @writer async EditProfile({ username, email }: IProfileModify) {
    try {
      return await this.update((user) => {
        user.username = username;
        user.email = email;
      }).then(() => {
        return {
          status: StatusCode.OK,
          msg: "Succès: La requête a bien été effectuée.",
        };
      });
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        msg: `Erreur: ${error}`,
      };
    }
  }
  // @ts-ignore
  @writer async EditPassword({
    old_password,
    new_password,
  }: IUserModelEditPassword) {
    try {
      if (!this.ComparePassword(old_password, this.password)) {
        return {
          status: StatusCode.Unauthorized,
          msg: "Erreur: L'ancien mot de passe ne correspond pas.",
        };
      } else {
        let hash_pwd = await this.HashPassword(new_password);
        return await this.update((user) => {
          user.password = hash_pwd;
        }).then(() => {
          return {
            status: StatusCode.OK,
            msg: "Succès: La requête a bien été effectuée.",
          };
        });
      }
    } catch (error) {
      return {
        status: StatusCode.Bad_Request,
        msg: `Erreur: ${error}`,
      };
    }
  }
  //#endregion
}
