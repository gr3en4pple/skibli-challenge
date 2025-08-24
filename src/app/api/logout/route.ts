import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookie = await cookies();
    cookie.delete("session");
    return NextResponse.json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error?.message || error?.status || "Error signed out!",
    });
  }
}

export async function DELETE() {
  try {
    const cookie = await cookies();
    cookie.delete("session");
    return NextResponse.json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error?.message || error?.status || "Error signed out!",
    });
  }
}
