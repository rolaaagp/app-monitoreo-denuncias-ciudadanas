import { httpClient, PRE_FIXES } from "@core/core/httpClient";
import { PayloadCreateUser, PayloadLogin, User } from "@core/interfaces";

export const getUser = (params: { id?: number; run?: string }) => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return httpClient.get<User>(`${PRE_FIXES.USERS}/users/get-list?${query}`);
};

export const createUser = (data: PayloadCreateUser) =>
  httpClient.post<{ user: User | null; user_exists: 1 | 0 }>(
    `${PRE_FIXES.USERS}/users/registro`,
    data
  );

export const loginUser = (data: PayloadLogin) =>
  httpClient.post<User | null>(`${PRE_FIXES.USERS}/auth/login`, data);
