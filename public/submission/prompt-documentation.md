# SmileCare — AI skills and prompt engineering documentation

Assessment category: Website Development. Domain: Healthcare.
Prepared: 26 October 2026. Project: SmileCare Dental Studio, a fictional clinic.

## Evidence and provenance

AI tool used in the observed improvement session: OpenAI Codex, for repository inspection, React implementation, debugging, validation, and documentation. Its access to the actual files enabled code-level refinement rather than a visual-only mockup. Supporting tools: Vite, Oxlint, Node's test runner, Playwright with Chrome, and Pillow for asset encoding. DevRelay supplied a developer-experience reference on accessibility; it was research, not an application dependency.

The supplied reference is titled “SMILECARE DENTAL STUDIO — GOOGLE ANTIGRAVITY PROMPTS.” Its wording does not prove which tool executed the original build. Do not claim Antigravity, ChatGPT, image generation, or other AI tools were used unless you personally used them and can supply that history. No runtime language-model API is called by this application. AI's meaningful role here is in development, review, debugging, and iteration, which the assessment permits for website development.

Original source: https://github.com/Gautam5514/course_selling/blob/main/prompt
An exact retrieved copy is provided as `original-prompts.txt`. It contains all 12 supplied prompts without rewriting their history.

The original build predates the visible session. This document records the reference prompts and the user prompts visible here; it does not claim access to every historical chat or hidden tool interaction. Attach any earlier AI chat export you have before claiming a complete historical prompt transcript.

## The supplied prompt sequence

| Prompt | Scope | Constraint that makes the prompt useful |
| --- | --- | --- |
| 01 | Setup, shared layout and design system | Exact stack, routes, tokens, fictional content, no backend |
| 02 | Home hero | Exact hierarchy, mobile stacking, image fallback |
| 03 | Home services | Six named services, shared data, responsive cards |
| 04 | Why choose us | Focused section scope and no invented medical claims |
| 05 | Team preview | Fictional profiles, no fabricated credentials |
| 06 | Patient experience and CTA | Explicit illustrative feedback labels |
| 07 | About page | Story, values, care process, consistent tokens |
| 08 | Services page | Query-based inquiry preselection and accessible FAQs |
| 09 | Doctors page | Clearly fictional clinician profiles |
| 10 | Appointment inquiry | Validated fields, preview/copy, no false booking confirmation |
| 11 | Contact page | Actual message preview, no fake delivery endpoint |
| 12 | QA and handoff | Route, responsive, functional and accessibility checks |

The exact full text of each prompt is in the accompanying original file. The sequence decomposes a large build into reviewable sections, gives concrete acceptance criteria, and repeatedly constrains scope to avoid unnecessary rewrites.

## Observed user follow-up 1: mobile refinement

Exact text:

> see it is not good as mobile view so design this very best and proper mobile view here

Input also included a screenshot of the expanded mobile navigation. AI inspected Header.jsx and index.css, then changed the growing menu to an overlay, removed blur over header controls, tightened touch-target spacing, and adjusted hero type. Build and lint were run at that stage. This prompt improved the result by supplying a concrete failure example instead of only asking for a “better design.”

## Observed user follow-up 2: assessment readiness

The user pasted the employer's full assessment, supplied the GitHub prompt link, and wrote:

> this is for that..!!! now you just do like make this application more production grade and then..!!! the all requirement you will perfect and best type

> this is the prompt now you which you use now that all prompt you use here and then design it

The employer's brief requires one healthcare/technology project, meaningful AI use, a minimum two-minute presentation, prompt documentation, and an accessible project link. These requirements were used as acceptance criteria. The Naukri page could not be retrieved; salary, working days, start time, and mandatory job eligibility have not been verified.

## Refinement brief applied by the coding agent

The following is a transparent description of the agent's working brief, not a fabricated quotation from an earlier conversation:

Preserve the original React/Vite/Tailwind stack and healthcare demo boundaries. Inspect existing files before editing. Add a service-interest finder that passes a service to the inquiry form; use deterministic preferences rather than claiming clinical AI. Extract and test validation. Fix clipboard failures honestly. Add a personal calendar follow-up reminder without personal information or confirmed appointment semantics. Improve navigation, focus, metadata, bundle loading and image payloads. Supply a reviewer walkthrough, prompt record, recording script, and run/deployment instructions. Verify real behavior and report unfinished external actions accurately.

## Iteration and problem solving

1. Mobile screenshot revealed an expanding header and obscured close control. The menu was moved below the header as an overlay; the page remains in place.
2. Inspection found copy fallbacks that always displayed success. A shared clipboard function now returns the actual fallback result and provides manual-copy guidance after failure.
3. Appointment service names were duplicated. Form options now derive from the same service definitions used elsewhere.
4. Calendar reminders could imply a confirmed visit. The exported all-day event explicitly says follow-up, is marked tentative, and excludes personal details.
5. Large JPEG assets increased transfer cost. Local WebP variants preserve the existing imagery at smaller encoded sizes; original assets remain available.
6. Repeated clinical and delivery wording risked misleading reviewers. Demo boundaries remain visible and no automatic callback or message dispatch is claimed.
7. Accessibility needed more than visible focus rings. Time windows use native radios; mobile navigation dismisses with Escape, restores focus, and makes background content inert while open.

## What was not measured or invented

No patient study, conversion uplift, booking rate, time-saving percentage, live clinic integration, medical accuracy certification, or production security certification is claimed. The app is a polished frontend assessment prototype, not a production clinical system. Check `validation-report.md` for executed checks and remaining limitations.

## How to present this honestly

Show an original scoped prompt, the mobile screenshot follow-up, the actual code changes, and the working inquiry flow. Explain why constraints and acceptance criteria improved output. Name only tools you actually used. Add earlier prompt history if available. Demonstrate the prototype and explain what real deployment would still require.
