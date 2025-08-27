import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateTaskFormType } from "@/types/task.type";
import React from "react";

interface ITitleInput {
  form: CreateTaskFormType;
}

const TitleInput: React.FC<ITitleInput> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-foreground text-sm font-medium">
            Title
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Enter title"
                {...field}
                className="border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-10 rounded-lg text-base backdrop-blur-sm transition-all duration-200 focus:ring-2"
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
