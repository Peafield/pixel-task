"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "@/lib/auth";
import type { LoginData } from "@/types/graphql";

export type AdminLoginResult = {
  success: boolean;
  message?: string;
};

export async function loginAction(
  _prevState: AdminLoginResult | null,
  formData: FormData,
): Promise<AdminLoginResult> {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  let loginResult: LoginData;
  try {
    loginResult = await login(email, password);
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Login failed: Invalid email or password",
    };
  }

  if (!loginResult) {
    return {
      success: false,
      message: "Login failed: Invalid email or password",
    };
  }

  const token = loginResult.user.token;
  const userId = loginResult.user._id;

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  cookieStore.set(
    "user-data",
    JSON.stringify({
      id: userId,
      email: loginResult.user.email,
      username: loginResult.user.username,
      firstName: loginResult.user.first_name,
      lastName: loginResult.user.last_name,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    },
  );

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  cookieStore.delete("user-data");
  redirect("/");
}
