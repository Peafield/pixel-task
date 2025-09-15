import { cookies } from "next/headers";
import type { LoginResponse } from "@/types/graphql";
import { graphqlFetch } from "./graphql";

export async function login(email: string, password: string) {
  const mutation = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          _id
          first_name
          last_name
          email
          username
          token
          is_email_verified
          is_active
          is_admin
        }
        permissions {
          title
          description
          code
          _id
        }
        isSuperAdmin
        unReadMessages
      }
    }
  `;

  try {
    const result = await graphqlFetch<LoginResponse>(mutation, {
      email,
      password,
    });

    return result.data.login;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value;
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export async function getUserId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const userDataString = cookieStore.get("user-data")?.value;

  if (!userDataString) {
    return undefined;
  }

  try {
    const userData = JSON.parse(userDataString);
    return userData.id;
  } catch (error) {
    console.error("Error parsing user data from cookie:", error);
    return undefined;
  }
}
