import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, formatVisiblePhoneNumber } from "@/lib/utils";
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
          <FormLabel className="text-foreground text-sm font-medium">
            Email
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Enter employee email"
                // readOnly={disabled}
                {...field}
                className={cn(
                  "border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-10 rounded-lg text-base backdrop-blur-sm transition-all duration-200 focus:ring-2",
                  {
                    "read-only:pointer-events-none read-only:opacity-50":
                      disabled,
                  },
                )}
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
