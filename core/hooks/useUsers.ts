import { createUser, getUser, loginUser } from "@core/services/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../core/httpClient";
import { PayloadCreateUser, PayloadLogin, User } from "../interfaces";

export const useUser = (params: { id?: number; run?: string }) => {
  return useQuery<User, Error>({
    queryKey: ["user", params],
    queryFn: async () => {
      const response = await getUser(params);
      return response.data;
    },
    enabled: !!params.id || !!params.run,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ user: User | null; user_exists: 1 | 0 }>,
    Error,
    PayloadCreateUser
  >({
    mutationFn: async (data: PayloadCreateUser) => {
      const response = await createUser(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User | null>, Error, PayloadLogin>({
    mutationFn: async (data: PayloadLogin) => {
      const response = await loginUser(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authlogin"] });
    },
  });
};
