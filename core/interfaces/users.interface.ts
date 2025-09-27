export interface PayloadCreateUser {
  perfiles_id: number;
  run: string;
  fullname: string;
  telefono: string;
  password: string;
}

export type PayloadCreateUserWhitoutPwd = Omit<PayloadCreateUser, "password">;

export const PERFILES = {
  CIUDADANO: 2,
};

export interface User {
  id: number;
  run: string;
  fullname: string;
  telefono: string;
  perfil: {
    id: number;
    nombre: string | null;
  };
}

export type PayloadLogin = Pick<User, "run"> & { password: string };
