"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
  error: null | string;
  success: boolean;
  data: unknown | null;
}

export async function signup(formdata: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formdata.get('email') as string,
    password: formdata.get('password') as string,
    options: {
      data: {
        full_name: formdata.get('full_name')
      }
    }
  };

  const { data: signupData, error } = await supabase.auth.signUp(data);
  return {
    error: error ? (error.message || "There was an error during sign up!") : null,
    success: !error,
    data: signupData || null
  };
}

export async function login(formdata: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formdata.get('email') as string,
    password: formdata.get('password') as string,
  };

  const { data: loginData, error } = await supabase.auth.signInWithPassword(data);
  return {
    error: error ? (error.message || "There was an error during login!") : null,
    success: !error,
    data: loginData || null
  };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  redirect("/dashboard");
}


export async function resetPassword(formdata: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formdata.get('email') as string;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  return {
    error: error ? (error.message || "There was an error sending reset email!") : null,
    success: !error,
    data: data || null
  };
}
