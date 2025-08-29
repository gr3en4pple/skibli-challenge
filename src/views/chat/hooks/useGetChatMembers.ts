import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface IGetChatMembersResponse {
  message?: string;
  data?: any[];
  error?: boolean;
  success?: boolean;
}

interface IGetChatMembersParams {
  limit?: number;
  page?: number;
}
const useGetChatMembers = (params?: IGetChatMembersParams) => {
  return useQuery({
    queryKey: ["getChatMembers", params],
    queryFn: async (): Promise<IGetChatMembersResponse> => {
      try {
        const { error, message, success, data } =
          await api.get<IGetChatMembersResponse>("/chats/members");

        if (error) {
          return { error, message };
        }

        return { success, message, data };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useGetChatMembers;
