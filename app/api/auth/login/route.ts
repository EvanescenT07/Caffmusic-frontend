import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return NextResponse.json(
    {
      success: true,
      message: "Login successful",
      token,
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; Max-Age=3600; SameSite=Strict;`,
      },
    }
  );
}
