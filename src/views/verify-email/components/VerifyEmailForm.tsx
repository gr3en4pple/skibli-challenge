"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, User, Lock } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useCompleteVerification from "../hooks/useCompleteVefication";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface VerifyEmailFormProps {
  token: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  token,
  onSuccess,
  onError,
}) => {
  const { mutateAsync: completeVerification, isPending } =
    useCompleteVerification();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      // Here you would typically make an API call to complete the email verification
      // with the username, password, and token
      const response = await completeVerification({
        token,
        username: values.username,
        password: values.password,
      });

      if (response.success) {
        window.location.href = "/dashboard";
        onSuccess?.();
      } else {
        // const errorData = await response.json();
        // onError?.(errorData.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      // onError?.("An unexpected error occurred");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="bg-card border-border/50 rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="from-primary/20 to-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
            <User className="text-primary h-8 w-8" />
          </div>
          <h2 className="text-foreground mb-2 text-xl font-semibold">
            Complete Your Registration
          </h2>
          <p className="text-muted-foreground text-sm">
            Please set your username and password to complete your account setup
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-medium">
                    Username
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        prefix={
                          <User className="text-muted-foreground h-4 w-4" />
                        }
                        disabled={isPending}
                        className="border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-12 rounded-xl text-base backdrop-blur-sm transition-all duration-200 focus:ring-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        prefix={
                          <Lock className="text-muted-foreground h-4 w-4" />
                        }
                        disabled={isPending}
                        className="border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-12 rounded-xl pr-12 text-base backdrop-blur-sm transition-all duration-200 focus:ring-2"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 h-12 w-full rounded-xl text-base font-medium transition-all duration-200 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Completing Registration...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
