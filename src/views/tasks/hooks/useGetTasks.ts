import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface IGetTasksResponse {
  message?: string;
  data?: any[];
  error?: boolean;
  success?: boolean;
}

interface IGetTasksParams {
  limit?: number;
  page?: number;
}
const useGetTasks = (params?: IGetTasksParams) => {
  return useQuery({
    queryKey: ["getTasks", params],
    queryFn: async (): Promise<IGetTasksResponse> => {
      try {
        const { error, message, success, data } =
          await api.get<IGetTasksResponse>("/tasks");

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

export default useGetTasks;
