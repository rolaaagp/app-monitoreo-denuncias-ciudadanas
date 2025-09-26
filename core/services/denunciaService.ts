import { httpClient, PRE_FIXES } from "@core/core/httpClient";
import { GetListDenuncias, PayloadCreateDenuncia } from "@core/interfaces";

export const getDenuncias = () =>
  httpClient.get<GetListDenuncias[]>(
    `${PRE_FIXES.DENUNCIAS}/denuncias/get-list`
  );

export const createDenuncia = (data: PayloadCreateDenuncia) =>
  httpClient.post<{ do: boolean }>(
    `${PRE_FIXES.DENUNCIAS}/denuncias/registro`,
    data
  );
