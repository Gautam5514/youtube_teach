import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Code2, Download, FileText, Play, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

const downloads = [
  { title: 'Prompt engineering log', detail: 'Original source, revisions, decisions, and honest provenance.', file: 'prompt-documentation.pdf', icon: FileText },
  { title: 'Original 12-prompt brief', detail: 'The exact reference supplied for this project.', file: 'original-prompts.txt', icon: Code2 },
  { title: 'Video presentation script', detail: 'A 2–3 minute walkthrough with screen cues.', file: 'video-script.md', icon: Play },
  { title: 'Reviewer guide', detail: 'Test scenarios, setup, scope, and limitations.', file: 'reviewer-guide.md', icon: ShieldCheck },
];

export default function ProjectPage() {
  return <>
    <section className="bg-deep-navy text-white py-14 sm:py-20">
      <div className="app-container">
        <Link to="/" className="inline-flex items-center text-sm text-slate-300 min-h-11">SmileCare / Project walkthrough</Link>
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 mt-6 items-center">
          <div>
            <span className="inline-flex gap-2 items-center text-xs tracking-widest text-[#5eead4] uppercase font-bold"><Sparkles size={16} aria-hidden="true" /> AI-assisted healthcare project</span>
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mt-5 max-w-2xl">From a prompt to a practical patient inquiry experience.</h1>
            <p className="text-slate-300 text-base leading-7 mt-5 max-w-xl">SmileCare turns service discovery and appointment preferences into a clear, ready-to-share inquiry. Designed for people. Built iteratively with AI.</p>
            <Link to="/appointment?service=General%20Dentistry" className="primary-button mt-7">Try the working demo <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
            <Workflow className="text-[#5eead4]" size={28} aria-hidden="true" />
            <h2 className="text-white text-xl mt-5">One useful workflow</h2>
            <ol className="mt-5 space-y-4 text-sm text-slate-200">{['Explore a care interest', 'Choose a service and preferences', 'Review a structured inquiry', 'Copy it and save a follow-up reminder'].map((step, i) => <li key={step} className="flex gap-3 items-center"><span className="w-7 h-7 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-[#5eead4]">{i + 1}</span>{step}</li>)}</ol>
            <p className="text-xs leading-5 text-slate-400 border-t border-white/10 pt-4 mt-5">Frontend prototype. No real bookings, message delivery, or runtime AI model. AI meaningfully assisted development and refinement.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="section-py bg-white">
      <div className="app-container">
        <span className="eyebrow">THE THINKING BEHIND THE BUILD</span>
        <h2 className="text-3xl mt-3">A focused problem. A demonstrable result.</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-8">{[
          ['01 / The problem', 'Scattered appointment details', 'A visitor may know what they want to explore but still send an incomplete inquiry. Staff then need to ask for missing preferences.'],
          ['02 / The approach', 'Guide, validate, structure', 'Connect service discovery to a validated form, prepare a consistent summary, and keep the visitor in control of sharing.'],
          ['03 / The result', 'A workflow you can test', 'Service preselection, accessible errors, inquiry preview, copy feedback, and a calendar follow-up file. No unmeasured efficiency claims.'],
        ].map(([label, title, text]) => <article key={title} className="rounded-2xl border border-slate-border p-6"><span className="text-xs text-teal-hover font-bold uppercase tracking-wide">{label}</span><h3 className="text-xl mt-4">{title}</h3><p className="text-sm leading-7 mt-3">{text}</p></article>)}</div>
      </div>
    </section>
    <section className="section-py">
      <div className="app-container">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end"><div><span className="eyebrow">ASSESSMENT MATERIALS</span><h2 className="text-3xl mt-3">Inspect the process, too.</h2></div><a href="/submission/prompt-documentation.pdf" download className="text-sm font-semibold text-teal-hover inline-flex items-center gap-2 min-h-11">Download prompt log <Download size={16} aria-hidden="true" /></a></div>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">{downloads.map(({ title, detail, file, icon: Icon }) => <a key={file} href={`/submission/${file}`} download className="group flex gap-4 items-start bg-white rounded-2xl border border-slate-border p-5 sm:p-6 hover:border-teal transition-colors"><span className="p-3 rounded-xl bg-pale-teal text-teal-hover shrink-0"><Icon size={21} aria-hidden="true" /></span><div className="min-w-0"><h3 className="text-base group-hover:text-teal-hover">{title}</h3><p className="text-sm leading-6 mt-1">{detail}</p><span className="inline-flex items-center gap-1 text-xs text-teal-hover font-semibold mt-3">Download <ArrowUpRight size={14} aria-hidden="true" /></span></div></a>)}</div>
      </div>
    </section>
    <section className="section-py bg-white border-t border-slate-border">
      <div className="app-container grid lg:grid-cols-2 gap-10">
        <div><span className="eyebrow">AI & PROMPT ENGINEERING</span><h2 className="text-3xl mt-3">Specific constraints.<br />Visible iteration.</h2><p className="mt-4 text-sm leading-7">OpenAI Codex assisted code inspection, implementation, debugging, and documentation in this session. The supplied prompt sequence set the stack, page scope, design tokens, and demo boundaries. Follow-up instructions addressed mobile layout and assessment readiness.</p><p className="mt-4 text-sm leading-7">The service finder and message formatter are deterministic application logic. They are not presented as an AI clinician or an AI model. The assessment category is website development using AI tools.</p></div>
        <div className="bg-offwhite border border-slate-border rounded-2xl p-6"><h3 className="text-xl">Before real clinic use</h3><ul className="list-disc pl-5 mt-4 space-y-3 text-sm leading-6"><li>Replace fictional profiles, images, hours, and contact details with approved clinic content.</li><li>Connect a verified delivery service and add server-side validation, consent records, and appropriate data handling.</li><li>Add real scheduling only when availability and confirmation can be verified.</li><li>Review accessibility, security, privacy, and clinical copy for the intended deployment.</li></ul><p className="mt-5 text-xs leading-5">The demo uses no database, tracking script, payment flow, or inference API. Form values remain in page memory unless the visitor explicitly copies, downloads, or shares them.</p></div>
      </div>
    </section>
  </>;
}
