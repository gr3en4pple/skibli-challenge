import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface IVerifyOTP {
  otp: string;
  phone?: string;
  email?: string;
  password?: string;
}

interface IVerifyOTPResponse {
  message?: string;
  token?: string;
  error?: boolean;
  success?: boolean;
}
const useVerifyOTP = () => {
  return useMutation({
    mutationKey: ["verifyOTP"],
    mutationFn: async (data: IVerifyOTP): Promise<IVerifyOTPResponse> => {
      try {
        const { error, message, success, token } =
          await api.post<IVerifyOTPResponse>("/verify-otp", data);

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

export default useVerifyOTP;
