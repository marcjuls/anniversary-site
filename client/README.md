# The Museum of Us

A private, mobile-first anniversary museum. April 6, 2025 is Room 01, and each
monthly exhibit receives its own visual direction.

## Foundation

- Password foyer backed by an encrypted, HTTP-only session cookie
- Museum lobby and live relationship clock
- Twenty-five room records through the second anniversary
- Individual room routes with provisional, distinct visual concepts
- Future rooms shown as closed exhibitions
- Room openings follow midnight in Asia/Manila
- Responsive and reduced-motion-friendly presentation
- A standalone twenty-four-frame portrait study served from private Vercel Blob storage

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `MUSEUM_ACCESS_CODE` to the private invitation code.
3. Set `MUSEUM_SESSION_SECRET` to a random value of at least 32 characters.
4. Set `BLOB_READ_WRITE_TOKEN` to a token for the private portrait Blob store.
5. Run `npm install` and `npm run dev`.

Do not commit real secret values. The same variables must be configured in the
Vercel project before deployment.

## Vercel

Use the Next.js framework preset with `client` as the root directory. Leave the
output directory on its framework default; the old Vite `dist` override must
not be used.

## Private media

The old public media has been moved to `legacy-media/` so it is not served by
the application. Because the GitHub repository is currently public, new private
photos and audio must not be committed here. Portrait files live in a private
Vercel Blob store and are streamed only through an authenticated, allowlisted
route after a visitor has unlocked the museum.
