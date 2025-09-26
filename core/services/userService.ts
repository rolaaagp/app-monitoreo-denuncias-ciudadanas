import { httpClient, PRE_FIXES } from "@core/core/httpClient";
import { PayloadCreateUser, User } from "@core/interfaces";

export const getUser = (params: { id?: number; run?: string }) => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return httpClient.get<User>(`${PRE_FIXES.USERS}/users/get-list?${query}`);
};

export const createUser = (data: PayloadCreateUser) =>
  httpClient.post<Omit<PayloadCreateUser, "password">>(
    `${PRE_FIXES.USERS}/users/registro`,
    data
  );
