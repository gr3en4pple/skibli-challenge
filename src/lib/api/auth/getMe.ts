import { cookies } from "next/headers";

const getMe = async () => {
  const cookie = await cookies();
  const sessionCookie = cookie.get("session")?.value || "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${sessionCookie}`,
    },
    cache: "no-cache",
    credentials: "include",
  });

  const user = await res.json();

  return user;
};

export default getMe;
