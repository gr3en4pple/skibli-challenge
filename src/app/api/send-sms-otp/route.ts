// app/api/send-otp/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";
import {
  adminAuth,
  adminDb,
  CollectionNames,
} from "@/lib/firebase/firebaseAdminConfig";
import { Timestamp } from "firebase-admin/firestore";
import ms from "ms";

const twilioClient = twilio(
  process.env.NEXT_PUBLIC_TWILIO_SID,
  process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN,
);

const getRandom6DigitsOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json(
      { message: "Phone number is required", error: true },
      { status: 400 },
    );
  }

  try {
    // send otp using twilio
    const otp = getRandom6DigitsOtp();
    // await twilioClient.messages.create({
    //   body: `Your verification code is ${otp}`,
    //   to: phone,
    //   from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
    // });

    const phoneDocRef = adminDb
      .collection(CollectionNames.otp_verifications)
      .doc(phone);
    const phoneDoc = await phoneDocRef.get();

    // exist document
    if (phoneDoc.exists) {
      const data = phoneDoc.data();
      const now = Date.now();
      const expiredAt = data?.expiredAt?.toMillis() || 0;

      // delete document if otp expired or isVerified
      // if otp hasn't expired and verified yet, return message
      if (data?.isVerified || now >= expiredAt) {
        await phoneDocRef.delete();
      } else {
        return NextResponse.json(
          { message: "OTP already sent to this phone number", success: true },
          { status: 200 },
        );
      }
    }

    await phoneDocRef.set({
      phone,
      otp,
      createdAt: Timestamp.now(),
      // expires in 15 minutes
      expiredAt: Timestamp.fromDate(new Date(Date.now() + ms("15 minutes"))),
      isVerified: false,
    });

    return NextResponse.json(
      { message: "Successfully sent otp: OTP is " + otp, success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.warn("send-sms-otp error:", error);
    return NextResponse.json(
      { message: error?.message || "Something wrong!", error: true },
      { status: error?.status || 500 },
    );
  }
}
