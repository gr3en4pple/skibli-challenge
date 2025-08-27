import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface IGetEmployeesResponse {
  message?: string;
  data?: any[];
  error?: boolean;
  success?: boolean;
}

interface IGetEmployeesParams {
  limit?: number;
  page?: number;
}
const useGetEmployees = (params?: IGetEmployeesParams) => {
  return useQuery({
    queryKey: ["getEmployees", params],
    queryFn: async (): Promise<IGetEmployeesResponse> => {
      try {
        const { error, message, success, data } =
          await api.get<IGetEmployeesResponse>("/employees");

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

export default useGetEmployees;
