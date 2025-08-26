"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogProps } from "@radix-ui/react-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useVerifySmsOTP from "../hooks/useVerifySmsOTP";
import { toast } from "sonner";
import { signInWithCustomToken } from "firebase/auth";
import { clientAuth } from "@/lib/firebase/firebaseClientConfig";
import useGetSession from "@/hooks/useGetSession";
import { useRouter } from "next/navigation";
interface IOtpInputDialog extends DialogProps {
  phone: string;
}

const OtpInputDialog: React.FC<IOtpInputDialog> = ({
  open,
  onOpenChange,
  phone,
}) => {
  const [otp, setOtp] = useState("");
  const { mutateAsync: verifySmsOtp, isPending } = useVerifySmsOTP();
  const { mutateAsync: getAuthSession, isPending: isPendingAuthSession } =
    useGetSession();

  const submitOtp = async (otp: string) => {
    try {
      const verifyingOtpToast = toast.loading("Verifying OTP...");

      const verifySms = await verifySmsOtp({
        phone,
        otp,
      });

      toast.dismiss(verifyingOtpToast);
      const successOtpToast = toast.success("OTP verified successfully!");

      if (verifySms.success) {
        const customToken = verifySms?.token;
        if (customToken) {
          toast.dismiss(successOtpToast);
          const signInToast = toast.loading("Signing you in...");
          const userCredential = await signInWithCustomToken(
            clientAuth,
            customToken,
          );

          const idToken = await userCredential.user.getIdToken();
          const { success } = await getAuthSession({
            token: idToken,
          });

          if (success) {
            window.location.href = "/dashboard";
            toast.dismiss(signInToast);
            toast.success("Signed in successfully!");
          } else {
            toast.warning("Failed to create session. Please try again.");
          }
        }
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
    <Dialog
      open={open}
      onOpenChange={
        isPending || isPendingAuthSession ? undefined : onOpenChange
      }
    >
      <DialogContent className="max-w-[320px] gap-0 rounded-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold">SMS OTP </DialogTitle>
          <DialogDescription className="">
            Submit your SMS OTP to login
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-2">
          <InputOTP
            disabled={isPending || isPendingAuthSession}
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
