import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface ICompleteVerification {
  token: string;
  username: string;
  password: string;
}

interface ICompleteVerificationResponse {
  message?: string;
  token?: string;
  error?: boolean;
  success?: boolean;
}
const useCompleteVerification = () => {
  return useMutation({
    mutationKey: ["completeVerification"],
    mutationFn: async (
      data: ICompleteVerification,
    ): Promise<ICompleteVerificationResponse> => {
      try {
        const { error, message, success, token } =
          await api.post<ICompleteVerificationResponse>(
            "/complete-verification-link",
            data,
          );

        if (error) {
          return { error, message };
        }

        return { success, message, token };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useCompleteVerification;
