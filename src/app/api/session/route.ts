import { NextResponse } from "next/server";
import createSessionCookie from "@/lib/api/auth/createSessionCookie";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const decoded = await createSessionCookie(token);

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
