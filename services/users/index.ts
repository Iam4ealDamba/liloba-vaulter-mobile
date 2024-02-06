import { database } from "@/database";

import { StatusCode } from "@/utils/enums";
import UserModel from "@/database/model/User";
import { ZodUserRegister } from "./types";

const user_collection = database.get<UserModel>("users");

export const UserRegisterService = async (
  username: string,
  email: string,
  password: string
) => {
  const verify_form = ZodUserRegister.safeParse({
    username,
    email,
    password,
  }).success;
  if (!verify_form) {
    return {
      success: StatusCode.Bad_Request,
      msg: "Erreur: des champs sont manquants/invalides.",
    };
  }

  const data = {
    username,
    email,
    password,
    img_url: null,
  };
  const new_user = await user_collection.modelClass.Register(data);

  if (new_user.status !== StatusCode.Created) {
    return {
      status: new_user.status,
      msg: new_user.msg,
    };
  }

  return {
    status: new_user.status,
    msg: new_user.msg,
    data: new_user.data,
  };
};
export const UserLoginService = async (email: string, password: string) => {
  const verify_form = ZodUserRegister.safeParse({
    email,
    password,
  }).success;
  if (!verify_form) {
    return {
      success: StatusCode.Bad_Request,
      msg: "Erreur: des champs sont manquants/invalides.",
    };
  }

  const data = {
    email,
    password,
  };
  const user = await user_collection.modelClass.Login(data);

  if (user.status !== StatusCode.OK) {
    return {
      status: user.status,
      msg: user.msg,
    };
  }

  return {
    status: user.status,
    msg: user.msg,
    data: user.data,
  };
};
export const GetUserProfileService = async () => {};
