import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const cookiesStore = await cookies();
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  cookiesStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
  });

  cookiesStore.set("state", state, {
    httpOnly: true,
  });

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });

  return Response.redirect(url);
}
