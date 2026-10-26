# SmileCare video presentation — target 2 minutes 40 seconds

Record your own voice and screen. This file is a script, not a completed video. Rehearse at a natural pace and check the recording is at least two minutes long. Replace any personal-experience statements with your own truthful experience. Use fictional demonstration data only.

## 0:00–0:25 — Project and problem (show the homepage)

“Hello, I’m Gautam. My project is SmileCare, an AI-assisted healthcare website for a fictional dental clinic. I chose the website development category. The problem I focused on is the gap between exploring dental services and preparing a complete appointment inquiry. Rather than making only a static landing page, I built a guided workflow that visitors can actually use.”

## 0:25–0:55 — AI tools and prompt engineering (show the prompt documents)

“I used OpenAI Codex in the improvement session to inspect the application, implement changes, debug edge cases, and prepare verification. The reference brief contains twelve scoped prompts covering the layout, individual pages, forms, and final quality checks. The prompts specify the stack, design tokens, responsive behavior, and acceptance criteria. A useful follow-up supplied a screenshot of the mobile menu problem. That made the issue concrete and led to an overlay that keeps the header controls clear.”

If you personally used Antigravity or another tool in the original build, add its real role here and show the evidence; do not infer usage from the reference file's title.

## 0:55–1:35 — Functional demonstration (show service finder and form)

“Here I choose an interest, such as teeth alignment. The application shows the corresponding service and carries it into the appointment inquiry. The visitor then enters contact details and a preferred date and time. If I leave required fields empty, the form shows errors and focuses the first invalid input. It validates the phone, email, date, service, time preference, and consent. These checks are deterministic logic; this interface is not claiming to diagnose a patient.”

Use fictional data: Demo Visitor, 9876543210, demo@example.com, a future date. Show an invalid submission before a valid one.

## 1:35–2:05 — Outcome and automation (show preview, copy and calendar download)

“The result is a structured inquiry preview. The visitor can copy it and download a personal follow-up reminder. The calendar file contains no contact details and does not represent a confirmed appointment. WhatsApp delivery remains disabled until a verified business number is configured. AI played a meaningful role in developing and improving the project, but the website does not make a runtime model call.”

## 2:05–2:40 — Challenges, decisions, and limits (show mobile menu and project walkthrough)

“The main challenges were making navigation work well on mobile, keeping service names consistent, and handling browser clipboard restrictions honestly. I used shared service data, accessible native controls, and explicit error feedback. I also reduced image payloads with WebP and split secondary pages into separate bundles. My approach was to turn a broad design brief into smaller, testable outcomes and verify the useful workflow. The project walkthrough includes prompts, setup instructions, and test evidence. A real clinic launch would require approved content, verified contact details, secure delivery and scheduling integrations, and deployment review. Thank you for reviewing my project.”

## Recording checklist

- Show the working app, not only source code or slides.
- Show the prompt log and at least one meaningful revision.
- Address previous experience truthfully: add one sentence about your actual React, design, or AI-tool experience, or explain what you learned if this is new.
- Record at 1080p if practical, with readable browser text and clear audio.
- Keep the final runtime at least 2:00; aim for 2:40–3:10 after your personal explanation.
- Watch the exported video, then upload it and test the viewer link in a signed-out browser.
