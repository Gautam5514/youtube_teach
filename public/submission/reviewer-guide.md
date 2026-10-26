# SmileCare reviewer guide

Healthcare / Website Development / AI-assisted frontend prototype.
Start at `/project` for the project story and downloadable assessment documents.

## Run locally

Use Node.js 22.12+ or a compatible newer version (the project was checked using Node 24).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm test
npm run lint
npm run build
npm run preview
```

## Suggested three-minute review

1. Open `/` and use the service-interest finder. Choose “Teeth alignment.”
2. Click “Prepare an inquiry” and confirm Orthodontics is preselected.
3. Submit an empty form. Check required errors and focus behavior.
4. Use fictional data: Demo Visitor, 9876543210, demo@example.com, a future date, any time window, and checked consent.
5. Prepare the request. Inspect the summary and use Copy Message. Download the calendar reminder and confirm it says follow-up, not booked appointment.
6. Open `/contact`, test invalid fields, and prepare a general message.
7. At mobile width, open the navigation, use Escape, and navigate to another page.
8. Open `/services#pediatric-dentistry` and verify the targeted section is reachable.
9. Open `/project` and download the prompt documentation and video script.

## Routes

`/`, `/about`, `/services`, `/doctors`, `/appointment`, `/contact`, `/project`, and a not-found route. Service inquiry query strings are supported.

## Architecture and AI role

React, Vite, JavaScript, Tailwind CSS, React Router, lucide-react. Shared service data and standalone validation/calendar utilities. Secondary routes load on demand. No database, inference API, authentication, payments, real appointment scheduling, or analytics. AI assisted development; the runtime service finder is a deterministic preference selector.

## Delivery and privacy boundaries

Form values are held in React memory and are not sent to a backend. The visitor controls copying/sharing. Calendar exports deliberately exclude names, phones, emails, and message content. Google Fonts requests may be made for typography; this is not a wholly offline application. All profiles, clinic contact details, opening hours and imagery are illustrative. Stock/image subject identity and clinical credentials are not verified. Image licensing and approved clinic content must be reviewed before real business use.

WhatsApp is disabled by default (`DEMO_WHATSAPP_NUMBER = ''`). Configure only a verified business number. Even then the visitor must press Send inside WhatsApp. No visit is ever confirmed by this app.

## Publish the project link

This folder does not itself establish a public deployment. Import the source repository into Vercel, choose Vite, build with `npm run build`, and publish `dist`. `vercel.json` supplies SPA rewrites. For Netlify, use the same build/output settings; `public/_redirects` supplies the fallback. Refresh `/appointment` and `/project` on the published domain, check document downloads, and test the URL while signed out before submitting.

Alternatively upload the source ZIP to Google Drive, enable viewer access for anyone with the link, and provide these run instructions. Do not include node_modules, credentials, or personal form data.
