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
    credentials: "include",
  });

  const user = await res.json();
  console.log('user:', user)

  return user;
};

export default getMe;
