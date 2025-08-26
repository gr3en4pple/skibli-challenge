import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { UserRecord } from "firebase-admin/auth";

interface IGetSessionResponse {
  message?: string;
  user?: UserRecord;
  error?: boolean;
  success?: boolean;
}
const useGetMe = () => {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: async (): Promise<IGetSessionResponse> => {
      try {
        const { error, message, success, user } =
          await api.get<IGetSessionResponse>("/me");

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

export default useGetMe;
