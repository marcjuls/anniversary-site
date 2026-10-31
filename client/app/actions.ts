"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { getMuseumSession } from "./lib/session";

export type UnlockState = { error: string };

function codesMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export async function unlockMuseum(
  _previousState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const expectedCode = process.env.MUSEUM_ACCESS_CODE;
  const receivedCode = String(formData.get("accessCode") ?? "").trim();
  const session = await getMuseumSession();

  if (!expectedCode || !session) {
    return { error: "The private entrance is not configured yet." };
  }

  if (!receivedCode || !codesMatch(receivedCode, expectedCode)) {
    return { error: "That invitation code does not match our guest list." };
  }

  session.unlocked = true;
  await session.save();
  redirect(formData.get("destination") === "/museum" ? "/museum" : "/anniversary#countdown");
}

export async function lockMuseum() {
  const session = await getMuseumSession();
  session?.destroy();
  redirect("/");
}
