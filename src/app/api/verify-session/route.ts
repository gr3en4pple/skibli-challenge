import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    if (!session) {
      return NextResponse.json(
        { error: true, message: "Invalid session cookie" },
        { status: 400 },
      );
    }

    await adminAuth.verifySessionCookie(session, true);
    return NextResponse.json(
      { success: true, message: "Session valid" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: true, message: "Invalid session cookie" },
      { status: 400 },
    );
  }
}
