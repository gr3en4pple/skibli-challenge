import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface IEditEmployeeResponse {
  message?: string;
  error?: boolean;
  success?: boolean;
}

interface IEditData {
  id: string;
  phone?: string;
  name?: string;
}

const useEditEmployee = () => {
  return useMutation({
    mutationKey: ["editEmployee"],
    mutationFn: async ({
      id,
      name,
      phone,
    }: IEditData): Promise<IEditEmployeeResponse> => {
      try {
        const { error, message, success } =
          await api.put<IEditEmployeeResponse>(`/employee/${id}`, {
            name,
            phone,
          });

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

export default useEditEmployee;
