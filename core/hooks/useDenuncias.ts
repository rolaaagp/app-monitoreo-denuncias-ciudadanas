import { createDenuncia, getDenuncias } from "@core/services/denunciaService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetListDenuncias, PayloadCreateDenuncia } from "../interfaces";

export const useDenuncias = () => {
  return useQuery<GetListDenuncias[], Error>({
    queryKey: ["denuncias"],
    queryFn: async () => {
      const response = await getDenuncias();
      return response.data;
    },
  });
};

export const useCreateDenuncia = () => {
  const queryClient = useQueryClient();

  return useMutation<{ do: boolean }, Error, PayloadCreateDenuncia>({
    mutationFn: async (data: PayloadCreateDenuncia) => {
      const response = await createDenuncia(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["denuncias"] });
    },
  });
};
