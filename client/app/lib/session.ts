import "server-only";

import { cookies } from "next/headers";
import { getIronSession, type IronSession } from "iron-session";

type MuseumSession = {
  unlocked?: boolean;
};

function sessionPassword() {
  const value = process.env.MUSEUM_SESSION_SECRET;
  return value && value.length >= 32 ? value : null;
}

export async function getMuseumSession(): Promise<IronSession<MuseumSession> | null> {
  const password = sessionPassword();
  if (!password) return null;

  return getIronSession<MuseumSession>(await cookies(), {
    cookieName: "museum-access",
    password,
    ttl: 60 * 60 * 24 * 7,
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  });
}

export async function isMuseumUnlocked() {
  const session = await getMuseumSession();
  return session?.unlocked === true;
}
