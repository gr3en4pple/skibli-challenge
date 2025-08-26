import { NextResponse } from "next/server";
import getMe from "@/lib/api/auth/getMe";

export async function GET() {
  try {
    const user = await getMe();

    if (!user)
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 400 },
      );
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error?.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
