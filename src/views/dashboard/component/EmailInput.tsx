import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatVisiblePhoneNumber } from "@/lib/utils";
import { CreateEmployeeFormType } from "@/types/employee.type";
import React from "react";

interface IEmailInput {
  form: CreateEmployeeFormType;
  disabled?: boolean;
}

const EmailInput: React.FC<IEmailInput> = ({ form, disabled }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-foreground">
            Email
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Enter employee email"
                {...field}
                readOnly
                // /={disabled}
                className="h-10 text-base transition-all duration-200 rounded-lg read-only:pointer-events-none read-only:opacity-50 border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 backdrop-blur-sm focus:ring-2"
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
