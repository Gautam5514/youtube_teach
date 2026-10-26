# SmileCare Dental Studio

An AI-assisted healthcare website that connects service discovery to a structured appointment inquiry. Built for the AI Growth & Automation Associate assessment, in the Website Development category.

## Run

Node.js 22.12+ (checked on Node 24).

```sh
npm ci
npm run dev
```

```sh
npm test
npm run lint
npm run build
npm run preview
```

## Working features

- Responsive home, about, services, fictional care team, appointment and contact pages.
- Guided service-interest finder with inquiry preselection.
- Appointment validation, consent, message preview, honest clipboard feedback.
- Personal calendar follow-up download with no contact data or booking confirmation.
- Accessible mobile navigation, native time-window radios, reduced-motion support.
- Shared service definitions, route metadata, secondary-page code splitting, WebP imagery.
- `/project` walkthrough and downloadable assessment materials.

## Assessment package

See [prompt documentation](public/submission/prompt-documentation.md), [original reference prompts](public/submission/original-prompts.txt), [video script](public/submission/video-script.md), [reviewer guide](public/submission/reviewer-guide.md), [validation report](public/submission/validation-report.md), and [submission email draft](docs/submission-email.md).

AI assisted implementation and review. The application does not call a runtime AI model. Original build history is not fully available; the prompt record distinguishes supplied reference prompts from observed user follow-ups.

## Scope

Fictional frontend demonstration, not a production clinical system. No backend, medical advice engine, confirmed bookings, payments, authentication, or automatic message delivery. Values remain in memory until explicitly copied or shared. Do not use real patient information for assessment testing.

## Deployment

Vercel: framework Vite, build `npm run build`, output `dist`. SPA fallback is configured in `vercel.json`. Netlify fallback is in `public/_redirects`. Verify direct route refreshes on the published host. No public URL is claimed until deployed and checked.

Before actual clinic use: approve content and image rights, configure real contact channels, integrate secure delivery/scheduling, and conduct the appropriate accessibility, privacy and security review.
