# TYPEFORGE — Web / Online Setup

This build keeps the existing local game and adds an online layer:

- Global RPG leaderboard sorted by best combat score.
- Anonymous sign-in on first visit (no email/phone required by default).
- Cloud profile name/design/font/score/wave.
- JPG/PNG/GIF profile pictures stored in Supabase Storage.
- Delete Account button that removes the online account and leaderboard entry.

## 1. Create a Supabase project

Create a project and enable **Anonymous Sign-Ins** under Authentication settings.

Then open SQL Editor and run `supabase.sql`.

## 2. Configure the browser client

Copy:

`supabase-config.example.js` -> `supabase-config.js`

Put your project's URL and browser-safe publishable key into that file.

Do NOT put a `service_role` or secret key in the website.

## 3. Deploy the delete-account function

The `supabase/functions/delete-account/index.ts` function uses the service role only on the server side.

Deploy it with the Supabase CLI and make sure the function has access to the project's normal Supabase environment variables.

The browser calls:

`/functions/v1/delete-account`

## 4. Deploy the website

The website is static HTML/CSS/JS, so it can be deployed to a static hosting service. Upload the whole folder, including `supabase-config.js`.

## Important privacy behavior

The leaderboard intentionally exposes only:

- display name
- profile picture URL
- selected design/font
- best RPG score
- highest wave

It does not publish email addresses or the internal Auth user ID.

## Important limitation for this first online version

Anonymous accounts are tied to the browser/device session. If someone clears browser data or switches devices, they cannot automatically recover the same anonymous account. Supabase documents that an anonymous user has no way to sign back in after losing that session.

If you want the same Typeforge account to work on multiple devices, the next upgrade should be an optional account-linking/sign-in system rather than collecting personal information by default.
