import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";

import ms from "ms";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const decoded = await adminAuth.verifyIdToken(token);

    // expire in 3 days
    const expiresIn = ms("3 days");
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });

    const cookie = await cookies();
    cookie.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully",
        user: decoded,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: true, message: "Invalid token" },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  (await cookies()).delete("session");
  return NextResponse.json({ status: "signed out" });
}
