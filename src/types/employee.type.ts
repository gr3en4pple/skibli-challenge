import { UseFormReturn } from "react-hook-form";

export interface CreateEmployeeFormType
  extends UseFormReturn<
    {
      email: string;
      role: string;
      name?: string;
      phone?: string;
    },
    any,
    {
      email: string;
      role: string;
      name?: string;
      phone?: string;
    }
  > {}

export interface CreateEmployeeParams {
  name: string;
  email: string;
  phone?: string;
  role: "employee" | "owner";
}

export interface Employee {
  uid:string
  email: string;
  hasAccount: boolean;
  name?: string;
  phone?: string;
  role: "employee";
}
