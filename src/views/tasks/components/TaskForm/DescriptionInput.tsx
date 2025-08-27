import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateTaskFormType } from "@/types/task.type";
import React from "react";

interface IDescriptionInput {
  form: CreateTaskFormType;
}

const DescriptionInput: React.FC<IDescriptionInput> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-foreground text-sm font-medium">
            Description
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Enter task description"
              rows={3}
              className="border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-10 resize-none rounded-lg text-base backdrop-blur-sm transition-all duration-200 focus:ring-2"
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default DescriptionInput;
