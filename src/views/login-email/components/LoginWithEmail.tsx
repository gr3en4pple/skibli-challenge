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
import { convertPhoneNumber, formatVisiblePhoneNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  Send,
  Smartphone,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useLoginByEmail from "../hooks/useLoginByEmail";
import OtpInputDialog from "./OtpInputDialog";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Password length must >= 6 characters")
    .max(30, "Password length must be <= 30 characters"),
});

const LoginWithEmail: React.FC = () => {
  const { mutateAsync, isPending } = useLoginByEmail();
  const [showModalOtp, setModalOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await mutateAsync({
        email: values.email,
        password: values.password,
      });
      if (res?.success) {
        setModalOtp(true);
        setFormData(values);
        form.reset();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-card border-border/50 rounded-2xl border p-8 shadow-xl backdrop-blur-sm">
        <div className="from-primary/20 to-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <div className="mb-8 text-center">
          <p className="text-muted-foreground text-sm">Login via Email</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      disabled={isPending}
                      className="border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 h-12 rounded-xl pr-16 text-base backdrop-blur-sm transition-all duration-200 focus:ring-2"
                    />
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
              {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </div>

      {showModalOtp && (
        <OtpInputDialog
          formData={formData}
          onOpenChange={() => setModalOtp(false)}
          open
        />
      )}
    </div>
  );
};

export default LoginWithEmail;
