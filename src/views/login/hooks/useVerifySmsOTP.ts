import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface IVerifySmsOTP {
  otp: string;
  phone: string;
}

interface IVerifySmsOTPResponse {
  message?: string;
  token?: string;
  error?: boolean;
  success?: boolean;
}
const useVerifySmsOTP = () => {
  return useMutation({
    mutationKey: ["verifySmsOTP"],
    mutationFn: async (data: IVerifySmsOTP): Promise<IVerifySmsOTPResponse> => {
      try {
        const { error, message, success, token } =
          await api.post<IVerifySmsOTPResponse>("/verify-sms-otp", data);

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

export default useVerifySmsOTP;
