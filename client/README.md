# The Museum of Us

A private, mobile-first anniversary museum. April 6, 2025 is Room 01, and each
monthly exhibit receives its own visual direction.

## Foundation

- Password foyer backed by an encrypted, HTTP-only session cookie
- Museum lobby and live relationship clock
- Twenty-five room records through the second anniversary
- Individual room routes with provisional, distinct visual concepts
- Future rooms shown as closed exhibitions
- Responsive and reduced-motion-friendly presentation

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `MUSEUM_ACCESS_CODE` to the private invitation code.
3. Set `MUSEUM_SESSION_SECRET` to a random value of at least 32 characters.
4. Run `npm install` and `npm run dev`.

Do not commit real secret values. The same variables must be configured in the
Vercel project before deployment.

## Private media

The old public media has been moved to `legacy-media/` so it is not served by
the application. Because the GitHub repository is currently public, new private
photos and audio must not be committed here. They will be added through a
private media delivery path when the final exhibits are curated.
