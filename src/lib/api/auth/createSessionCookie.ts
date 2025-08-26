import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/firebaseAdminConfig";
import ms from "ms";

const createSessionCookie = async (idToken: string) => {
  const decoded = await adminAuth.verifyIdToken(idToken);

  // expire in 3 days
  const expiresIn = ms("3 days");
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  const cookie = await cookies();
  cookie.set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresIn / 1000,
    path: "/",
  });

  return decoded;
};
export default createSessionCookie;
