import { beforeEach, describe, expect, it, vi } from "vitest";

const { session, getSession, redirect } = vi.hoisted(() => ({
  session: { unlocked: false, save: vi.fn(), destroy: vi.fn() },
  getSession: vi.fn(),
  redirect: vi.fn((destination: string) => { throw new Error(`redirect:${destination}`); }),
}));

vi.mock("./lib/session", () => ({ getMuseumSession: getSession }));
vi.mock("next/navigation", () => ({ redirect }));

import { unlockMuseum } from "./actions";

describe("the private entrance after reading the letter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("MUSEUM_ACCESS_CODE", "test-invitation");
    session.unlocked = false;
    getSession.mockResolvedValue(session);
  });

  it.each([
    ["/museum", "/museum"],
    ["/anniversary#countdown", "/anniversary#countdown"],
    ["https://example.com", "/anniversary#countdown"],
    ["", "/anniversary#countdown"],
  ])("opens the correct page for destination %s", async (destination, expected) => {
    const form = new FormData();
    form.set("accessCode", "test-invitation");
    form.set("destination", destination);

    await expect(unlockMuseum({ error: "" }, form)).rejects.toThrow(`redirect:${expected}`);
    expect(session.unlocked).toBe(true);
    expect(session.save).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(expected);
  });

  it("keeps the memories locked when the code is wrong", async () => {
    const form = new FormData();
    form.set("accessCode", "wrong-code");
    form.set("destination", "/museum");

    expect(await unlockMuseum({ error: "" }, form)).toEqual({ error: "That invitation code does not match our guest list." });
    expect(session.unlocked).toBe(false);
    expect(session.save).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("does not open the memories if the private entrance is unconfigured", async () => {
    getSession.mockResolvedValue(null);
    const form = new FormData();
    form.set("accessCode", "test-invitation");

    expect(await unlockMuseum({ error: "" }, form)).toEqual({ error: "The private entrance is not configured yet." });
    expect(redirect).not.toHaveBeenCalled();
  });
});
