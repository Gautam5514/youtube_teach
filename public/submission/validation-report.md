# Validation report

Date: 26 October 2026. Environment: local Vite server, Node 24, isolated headless Chrome via Playwright. These are local prototype checks, not a production certification or public-host verification.

## Executed checks

- `npm test`: five tests pass. Coverage includes shared service consistency, required fields, phone/email checks, valid/past/impossible dates, time/service allowlists, consent, note length, calendar year rollover, injection rejection, tentative status, and exclusion of personal data from reminders.
- `npm run lint`: passes without reported warnings after fixes.
- `npm run build`: passes; secondary pages are emitted as separate chunks.
- Eight routes (`/`, `/about`, `/services`, `/doctors`, `/appointment`, `/contact`, `/project`, `/missing`) checked at 320, 390, 768, 1024 and 1440px: one main h1 per page and no document-level horizontal overflow observed.
- Mobile menu: opening leaves the main content in the same position; main/footer become inert; Escape closes; focus returns to the toggle; choosing a link closes the menu and restores background interaction.
- Service finder: choosing Teeth alignment leads to the appointment form with Orthodontics selected.
- Appointment: empty submission produces errors and focuses name; valid demonstration values produce a structured preview; real clipboard contents verified; downloaded .ics inspected for tentative status and absence of contact details; no WhatsApp link exists while the business number is unconfigured.
- Contact: valid inquiry preview and actual clipboard contents verified; simulated clipboard and legacy fallback failure shows manual-copy feedback rather than success.
- Direct service-section link scrolls to Pediatric Dentistry. FAQ opens and closes with correct expanded state.
- Assessment downloads, including the prompt PDF and text records, return HTTP 200 and contain substantive content. The PDF was rendered and visually inspected; all twelve prompt headings were checked in extracted text.
- No uncaught page errors observed during the completed browser run.
- Mobile home/menu and desktop home/project screenshots visually inspected.

## Problems caught and resolved

- Time-window input hit target: replaced an obscured radio with a visible native control.
- Copy fallback: stopped reporting success when the browser rejects both copy methods.
- Route anchor handling: explicitly scroll to service IDs after route render; the test waits for the rendered destination rather than asserting before lazy rendering completes.
- Contrast: darker teal for small accent text and filled controls while preserving the original palette.
- Stale previews: changing a form clears its previous prepared summary.

## Performance evidence

The built hero asset changed from 667.37 kB JPEG to 52.53 kB WebP. Existing local photographs now use WebP variants. Secondary route code is split; the built main JS bundle is approximately 322 kB uncompressed. No Lighthouse score, Core Web Vitals score, measured conversion lift, or network-speed benchmark is claimed.

## Reproduce browser checks

The local browser check source is `scripts/browser-check.cjs`. It uses an optional Playwright installation (not a runtime dependency): install Playwright in your test environment, install its Chromium browser, start `npm run dev`, then run `node scripts/browser-check.cjs`. `BASE_URL` can target another local preview. `CHROME_PATH` can select an installed Chrome executable. Screenshots are written to /tmp. The session used a temporary Playwright installation and the installed Chrome executable, not a committed browser binary.

## Not completed or not claimed

- No public domain/deployment or signed-out link accessibility verified.
- No personal video recorded; a timed script is supplied.
- No email sent or external submission made.
- Naukri job description was inaccessible; fixed terms and mandatory employment eligibility were not verified.
- Earlier AI conversations are not available; original reference prompts and visible follow-ups are documented with their provenance.
- No exhaustive manual screen-reader audit, formal accessibility certification, real-device Safari test, penetration test, server-side validation, real appointment scheduling, or real message delivery.
- Image licensing and clinic-authorized content must be checked before real commercial use.
