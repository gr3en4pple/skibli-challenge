import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateEmployeeFormType } from "@/types/employee.type";
import React from "react";

interface INameInput {
  form: CreateEmployeeFormType;
}

const NameInput: React.FC<INameInput> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-foreground">
            Name
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Enter employee name"
                {...field}
                className="h-10 text-base transition-all duration-200 rounded-lg border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 backdrop-blur-sm focus:ring-2"
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default NameInput;
