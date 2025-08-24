import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface IGetSession {
  token: string;
}

interface IGetSessionResponse {
  message?: string;
  user?: any;
  error?: boolean;
  success?: boolean;
}
const useGetSession = () => {
  return useMutation({
    mutationKey: ["getSession"],
    mutationFn: async (data: IGetSession): Promise<IGetSessionResponse> => {
      try {
        const { error, message, success, user } =
          await api.post<IGetSessionResponse>("/session", data);

        if (error) {
          return { error, message };
        }

        return { success, message, user };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useGetSession;
