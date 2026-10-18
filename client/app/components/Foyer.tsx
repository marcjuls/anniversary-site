"use client";

import { useActionState } from "react";
import { unlockMuseum, type UnlockState } from "../actions";

const initialState: UnlockState = { error: "" };

export default function Foyer() {
  const [state, formAction, pending] = useActionState(unlockMuseum, initialState);

  return (
    <main className="foyer-shell">
      <div className="foyer-grain" aria-hidden="true" />
      <section className="foyer-card" aria-labelledby="foyer-title">
        <div className="museum-seal" aria-hidden="true">
          <span>M</span><span>♡</span><span>U</span>
        </div>
        <p className="eyebrow">Private collection · By invitation only</p>
        <h1 id="foyer-title">The Museum of Us</h1>
        <p className="foyer-intro">
          A living collection of ordinary days, unforgettable rooms, and a love
          story still being curated.
        </p>

        <form action={formAction} className="foyer-form">
          <label htmlFor="accessCode">Invitation code</label>
          <div className="code-entry">
            <input
              id="accessCode"
              name="accessCode"
              type="password"
              autoComplete="current-password"
              placeholder="Enter the private code"
              required
              aria-describedby={state.error ? "access-error" : "access-note"}
            />
            <button type="submit" disabled={pending}>
              {pending ? "Checking…" : "Enter museum"}
            </button>
          </div>
          {state.error ? (
            <p className="form-message form-message--error" id="access-error" role="alert">
              {state.error}
            </p>
          ) : (
            <p className="form-message" id="access-note">
              Your invitation keeps this collection between us.
            </p>
          )}
        </form>

        <div className="foyer-hours" aria-label="Museum details">
          <span>Established</span><strong>April 6, 2025</strong>
          <span>Collection</span><strong>Always growing</strong>
        </div>
      </section>
    </main>
  );
}
