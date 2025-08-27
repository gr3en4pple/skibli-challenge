import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface ILoginByEmail {
  email: string;
  password: string;
}

interface ILoginByEmailResponse {
  message?: string;
  error?: boolean;
  success?: boolean;
}
const useLoginByEmail = () => {
  return useMutation({
    mutationKey: ["loginByEmail"],
    mutationFn: async (data: ILoginByEmail): Promise<ILoginByEmailResponse> => {
      try {
        const { error, message, success } =
          await api.post<ILoginByEmailResponse>("/login-email", data);

        if (error) {
          return { error, message };
        }

        return { success, message };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useLoginByEmail;
