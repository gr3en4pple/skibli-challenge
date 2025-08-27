import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface ICreateEmployeeResponse {
  message?: string;
  id?: any;
  error?: boolean;
  success?: boolean;
}

interface ICreateEmployeeData {
  email: string;
  phone?: string;
  name?: string;
}
const useCreateEmployee = () => {
  return useMutation({
    mutationKey: ["getEmployees"],
    mutationFn: async (
      data: ICreateEmployeeData,
    ): Promise<ICreateEmployeeResponse> => {
      try {
        const { error, message, success, id } =
          await api.post<ICreateEmployeeResponse>("/employee", data);

        if (error) {
          return { error, message };
        }

        return { success, message, id };
      } catch (error: any) {
        return {
          error: true,
          message: error?.message || "Something went wrong",
        };
      }
    },
  });
};

export default useCreateEmployee;
