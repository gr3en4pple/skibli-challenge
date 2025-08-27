const verifyEmailLink = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/verify-email-link`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    },
  );

  const user = await res.json();

  return user;
};

export default verifyEmailLink;
