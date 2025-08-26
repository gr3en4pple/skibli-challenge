import { UseFormReturn } from "react-hook-form";
import { Timestamp } from "firebase-admin/firestore";

export interface CreateEmployeeFormType
  extends UseFormReturn<
    {
      name: string;
      phone: string;
      email: string;
      role: string;
    },
    any,
    {
      name: string;
      phone: string;
      email: string;
      role: string;
    }
  > {}

export interface CreateEmployeeParams {
  name: string;
  email: string;
  phone?: string;
  role: "employee" | "owner";
}
