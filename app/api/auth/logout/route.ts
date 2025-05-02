import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly"
  );
  return response;
}
