-- Initialisation des tables

create table users (
  user_id int not null primary key,
  username varchar(255) not null,
  email varchar(255) not null
  password varchar(255) not null,
  img_url text
)

create table services (
  service_id int not null primary key,
  service_name varchar(255) not null,
  service_email varchar(255) not null,
  service_password varchar(255) not null,
  service_img text,

  -- Belong to
  fk_user_id int not null,
  FOREIGN KEY (fk_user_id) REFERENCES users(user_id)
)