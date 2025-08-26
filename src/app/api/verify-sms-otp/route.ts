import { NextResponse } from "next/server";
import {
  adminAuth,
  adminDb,
  CollectionNames,
} from "@/lib/firebase/firebaseAdminConfig";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json(
      { error: true, message: "Phone and OTP must not be empty!" },
      { status: 400 },
    );
  }
  try {
    const phoneDocRef = adminDb
      .collection(CollectionNames.otp_verifications)
      .doc(phone);
    const phoneDoc = await phoneDocRef.get();

    if (!phoneDoc.exists) {
      return NextResponse.json(
        { error: true, message: "OTP not found" },
        { status: 400 },
      );
    }

    const docData = phoneDoc.data();
    if (
      docData?.otp !== otp ||
      docData?.isVerified ||
      (docData?.expiredAt?.toMillis() || 0) < new Date().getTime()
    ) {
      return NextResponse.json(
        { error: true, message: "OTP Error, please try again later!" },
        { status: 400 },
      );
    }

    // update isVerified field
    await phoneDocRef.update({ isVerified: true });

    let user;
    try {
      user = await adminAuth.getUserByPhoneNumber(phone);
    } catch (error) {
      user = await adminAuth.createUser({ phoneNumber: phone });
      if (user) {
        await adminAuth.setCustomUserClaims(user.uid, { role: "owner" });
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: true, message: "Error while get user!" },
        { status: 400 },
      );
    }
    const customToken = await adminAuth.createCustomToken(user.uid);

    return NextResponse.json(
      { success: true, token: customToken },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error?.message },
      { status: error?.status || 500 },
    );
  }
}
