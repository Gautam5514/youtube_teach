# Implementation decisions

- Preserve the supplied SmileCare brand and existing page structure. Add useful functionality instead of replacing the application with a generic landing page.
- Keep bright teal as an accent; use a darker teal for small text and filled controls so the original palette remains recognizable with stronger contrast.
- Anchor the mobile menu below a visible sticky header. The overlay does not change document flow, and background main/footer content is inert while open.
- Use shared service records for discovery and appointment options. The finder follows an expressed interest; it does not infer disease or prescribe treatment.
- Keep appointment and contact values in React memory. Editing a form clears its old preview so a stale summary is not copied accidentally.
- Treat clipboard operations as fallible, with actual fallback results and manual-copy feedback.
- Export an all-day tentative follow-up reminder, with no personal contact data and no implication of a confirmed slot.
- Split secondary page code and encode the existing local photographs as WebP. This reduces transfers without adding a runtime image service.
- Provide a separate /project route for assessment evidence so clinic visitors are not forced through implementation details.
- Keep original prompts and observed follow-ups distinct. Never fabricate a historical transcript, personal experience, public deployment, or completed recording.
