import { NextResponse } from "next/server";
import getRoleFromCookie from "@/lib/api/auth/getRoleFromCookie";
import { Role } from "@/config";

export async function POST(req: Request) {
  try {
    const userRole = await getRoleFromCookie();
    const { name, phone, email, role } = await req.json();
    if (!userRole || userRole !== Role.OWNER) {
      return NextResponse.json(
        { error: true, message: "Unauthorized" },
        { status: 403 },
      );
    }

    // const params = { name, phone, email, role };
    // const employeeDoc = await createEmployee(params);
    // return NextResponse.json(
    //   { success: true, message: "Create Employee Successfully", id: employeeDoc.id },
    //   { status: 200 },
    // );
  } catch (err) {
    return NextResponse.json(
      { error: true, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
