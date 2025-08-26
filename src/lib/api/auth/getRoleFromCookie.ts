import { Role } from "@/config";
import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import { cookies } from "next/headers";

const getRoleFromCookie = async () => {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) return null;
  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  return decoded?.role || Role.EMPLOYEE;
};

export default getRoleFromCookie;
