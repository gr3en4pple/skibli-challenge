"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DialogProps } from "@radix-ui/react-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerifyOTP from "@/hooks/useVerifyOTP";
import { toast } from "sonner";

interface IOtpInputDialog extends DialogProps {
  formData: { email: string; password: string };
}

const OtpInputDialog: React.FC<IOtpInputDialog> = ({
  open,
  onOpenChange,
  formData,
}) => {
  const [otp, setOtp] = useState("");
  const { mutateAsync: verifyOtp, isPending } = useVerifyOTP();

  const submitOtp = async (otp: string) => {
    try {
      const verifyingOtpToast = toast.loading("Verifying OTP...");

      const verifyRes = await verifyOtp({
        email: formData.email,
        password: formData.password,
        otp,
      });

      toast.dismiss(verifyingOtpToast);
      const successOtpToast = toast.success("OTP verified successfully!");
      if (verifyRes.success) {
        window.location.href = "/tasks";
        toast.dismiss(successOtpToast);
        toast.success("Signed in successfully!");
      } else {
        toast.warning("Failed to create session. Please try again.");
      }
    } catch (error: any) {
      toast.warning(
        error?.message || "Authentication failed. Please try again.",
      );
    }
  };

  const onChange = async (value: string) => {
    if (value === "" || new RegExp("^\\d+$").test(value)) {
      setOtp(value);
      if (value.length === 6) {
        await submitOtp(value);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="max-w-[320px] gap-0 rounded-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold">
            Email OTP{" "}
          </DialogTitle>
          <DialogDescription className="">
            Submit your Email OTP to login
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-2">
          <InputOTP
            disabled={isPending}
            maxLength={6}
            value={otp}
            onChange={onChange}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-primary text-center text-sm">
            Enter your one-time password.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpInputDialog;
