import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface ISendSmsOTP {
  phone: string;
}

interface ISendSmsOTPResponse {
  message?: string;
  error?: boolean;
  success?: boolean;
}
const useSendSmsOTP = () => {
  return useMutation({
    mutationKey: ["sendSmsOTP"],
    mutationFn: async (data: ISendSmsOTP): Promise<ISendSmsOTPResponse> => {
      try {
        const { error, message, success } = await api.post<ISendSmsOTPResponse>(
          "/send-sms-otp",
          data,
        );

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

export default useSendSmsOTP;
