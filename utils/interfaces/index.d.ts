export interface IServiceItem {
  id: number;
  name: string;
  email: string;
  password: string;
  img_url?: string;
  created_at: string;
  updated_at: string;
}
export interface IProfileModify {
  username: string;
  email: string;
}
export interface IProfilePasswordModify {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

// Users Model
export interface IUserModelRegister {
  username: string;
  email: string;
  password: string;
  img_url?: string | null;
}
export interface IUserModelLogin {
  email: string;
  password: string;
}
export interface IUserModelEditProfile {
  username: string;
  email: string;
}
export interface IUserModelEditPassword {
  old_password: string;
  new_password: string;
}

// Services Model
export interface IServiceModelCreate {
  service_name: string;
  service_email: string;
  service_password: string;
  service_img_url?: string | null;
  fk_user_id: string;
}
