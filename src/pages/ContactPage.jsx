import React, { useState, useId } from 'react';
import { copyText } from '../lib/clipboard';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Calendar,
  Compass
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How can I contact the clinic?',
    answer: 'You can prepare an inquiry message using the contact form on this page, copy the structured text to your preferred messaging app, or draft an email. Once live contact numbers and inboxes are connected by the clinic owner, direct phone and message channels will become fully active.',
  },
  {
    question: 'Can I request an appointment online?',
    answer: 'Yes! You can prepare an appointment consultation request via our /appointment page by selecting your preferred service, date, and time window. Please note that submitting prepares an inquiry rather than an instantly confirmed booking; our clinic coordinator will review your request and confirm mutual availability.',
  },
  {
    question: 'Where can I find treatment information?',
    answer: 'Detailed information regarding each of our six core care areas—General Dentistry, Teeth Whitening, Dental Implants, Orthodontics, Root Canal Care, and Pediatric Dentistry—is available on our Services page (/services), including descriptions, feature highlights, and care chips.',
  },
];

export default function ContactPage() {
  // Unique IDs for aria-describedby accessibility
  const nameErrorId = useId();
  const emailErrorId = useId();
  const phoneErrorId = useId();
  const subjectErrorId = useId();
  const messageErrorId = useId();
  const consentErrorId = useId();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Validation and output states
  const [errors, setErrors] = useState({});
  const [previewMessage, setPreviewMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // 1. Name: required, min 2 chars
    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. Email: required, valid format
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 3. Phone: optional, but check if user provided invalid characters
    if (phone.trim() && (!/^[0-9+\-\s()]+$/.test(phone.trim()) || !/^\d{7,15}$/.test(phone.replace(/\D/g, '')))) {
      newErrors.phone = 'Please enter a valid phone number or leave blank.';
    }

    // 4. Subject: required
    if (!subject.trim()) {
      newErrors.subject = 'Please enter a subject for your inquiry.';
    }

    // 5. Message: required, min 10 chars
    if (!message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    // 6. Consent: required
    if (!consent) {
      newErrors.consent = 'You must agree to prepare and share this inquiry.';
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, newErrors };
  };

  // Generate formatted message preview
  const generateFormattedMessage = () => {
    const lines = [
      '📩 *SmileCare Dental Studio — General Contact Inquiry*',
      '',
      `• *From:* ${name.trim()}`,
      `• *Email:* ${email.trim()}`,
      `• *Phone:* ${phone.trim() ? phone.trim() : 'Not provided'}`,
      `• *Subject:* ${subject.trim()}`,
      '',
      '*Message Content:*',
      message.trim(),
      '',
      '_Note: Prepared via SmileCare Dental Studio demo interface. Educational demonstration site._',
    ];
    return lines.join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validateForm();

    if (!isValid) {
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return;
    }

    const formatted = generateFormattedMessage();
    setPreviewMessage(formatted);
    setCopyError('');
    setCopied(false);

    // Scroll to preview smoothly
    setTimeout(() => {
      const previewEl = document.getElementById('contact-preview-panel');
      if (previewEl) {
        previewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // Clipboard copy handler with fallback
  const handleCopy = async () => {
    if (!previewMessage) return;
    const success = await copyText(previewMessage);
    setCopied(success);
    setCopyError(success ? '' : 'Copy was blocked. Select the message and copy it manually.');

  };

  return (
    <div className="flex-grow flex flex-col justify-start">
      
      {/* 1. HERO SECTION */}
      <section 
        aria-label="Contact Overview"
        className="w-full bg-[#E8F8F5] border-b border-[#E4EBF0] py-12 sm:py-16 flex items-center justify-center text-center"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Linked Breadcrumb: Home / Contact */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-[#526477] mb-4">
            <Link to="/" className="hover:text-[#102A43] font-medium transition-colors">
              Home
            </Link>
            <span className="text-[#8295A9]">/</span>
            <span className="text-[#0d8277] font-semibold">Contact</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5 shadow-2xs">
            CONTACT US
          </span>

          {/* Heading h1 */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15] max-w-2xl mx-auto">
            We’re Here to Help
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Have a question about our services? Reach out and explore the next step.
          </p>

        </div>
      </section>

      {/* 2. CONTACT CARDS: 3 RESPONSIVE CARDS */}
      <section 
        aria-label="Contact methods"
        className="w-full bg-white border-b border-[#E4EBF0] py-12 sm:py-16"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Call Our Clinic */}
            <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.08)] hover:-translate-y-1 hover:border-[#13B8A6]/40 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-5">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2">
                  Call Our Clinic
                </h2>
                <p className="text-xs text-[#526477] leading-relaxed mb-4">
                  Speak directly with a clinic receptionist regarding scheduling questions, general visit procedures, or directions.
                </p>
              </div>
              
              <div className="pt-4 border-t border-[#F7FAFC]">
                {/* Non-clickable demo notice */}
                <span className="inline-block text-xs font-semibold text-[#8295A9] bg-[#F7FAFC] px-3 py-1.5 rounded-[8px] border border-[#E4EBF0]">
                  Demo phone — add real number
                </span>
              </div>
            </div>

            {/* Card 2: Send an Email */}
            <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.08)] hover:-translate-y-1 hover:border-[#13B8A6]/40 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-5">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2">
                  Send an Email
                </h2>
                <p className="text-xs text-[#526477] leading-relaxed mb-4">
                  Send detailed inquiries, share patient notes, or request non-urgent consultation details at your convenience.
                </p>
              </div>

              <div className="pt-4 border-t border-[#F7FAFC]">
                <span className="inline-block text-xs font-semibold text-[#102A43] bg-[#E8F8F5] px-3 py-1.5 rounded-[8px] border border-[#13B8A6]/20">
                  hello@smilecare.example <span className="text-[#526477] font-normal">(demo address)</span>
                </span>
              </div>
            </div>

            {/* Card 3: Find Our Clinic */}
            <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.08)] hover:-translate-y-1 hover:border-[#13B8A6]/40 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2">
                  Find Our Clinic
                </h2>
                <p className="text-xs text-[#526477] leading-relaxed mb-4">
                  Visit our state-of-the-art clinic studio designed for serene comfort and accessible parking.
                </p>
              </div>

              <div className="pt-4 border-t border-[#F7FAFC]">
                <span className="inline-block text-xs font-semibold text-[#8295A9] bg-[#F7FAFC] px-3 py-1.5 rounded-[8px] border border-[#E4EBF0]">
                  Demo location — add actual clinic address
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CONTACT FORM & LOCATION PANEL (TWO-COLUMN LAYOUT) */}
      <section 
        aria-label="Contact form and location details"
        className="w-full bg-[#F7FAFC] py-14 sm:py-20"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT: MAIN FORM (Approx 60-65% on Desktop) */}
            <div className="lg:col-span-7 min-w-0">
              <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-6 sm:p-10 shadow-[0_10px_30px_rgba(16,42,69,0.06)]">
                
                <div className="border-b border-[#E4EBF0] pb-6 mb-7">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0d8277] uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>DIRECT INQUIRY</span>
                  </div>
                  <h2 className="text-2xl sm:text-[26px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-[#526477] mt-1 leading-relaxed">
                    Fill out the form below to prepare an inquiry message for our clinic team.
                  </p>
                </div>

                {/* Semantic Form */}
                <form onSubmit={handleSubmit} onChange={() => { setPreviewMessage(null); setCopied(false); setCopyError(''); }} noValidate className="space-y-5">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Rahul Sharma"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? nameErrorId : undefined}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                          errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      />
                      {errors.name && (
                        <p id={nameErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="e.g. rahul@example.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? emailErrorId : undefined}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      />
                      {errors.email && (
                        <p id={emailErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone (Optional) & Subject (Required) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label 
                        htmlFor="phone" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Phone Number <span className="text-xs font-normal text-[#8295A9] normal-case">(Optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="e.g. +91 98765 43210"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? phoneErrorId : undefined}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                          errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      />
                      {errors.phone && (
                        <p id={phoneErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label 
                        htmlFor="subject" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                        }}
                        placeholder="e.g. Inquiry about consultation"
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? subjectErrorId : undefined}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                          errors.subject ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      />
                      {errors.subject && (
                        <p id={subjectErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message (Required) */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Please write your questions or comments here..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? messageErrorId : undefined}
                      className={`w-full p-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                        errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                      }`}
                    />
                    {errors.message && (
                      <p id={messageErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox (Required) */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? consentErrorId : undefined}
                        className="mt-1 w-4 h-4 rounded text-[#0d8277] border-[#CBD2D9] focus:ring-[#13B8A6] focus:ring-offset-0 transition-colors"
                      />
                      <span className="text-xs sm:text-sm text-[#526477] leading-relaxed select-none">
                        I agree to prepare and share this inquiry <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id={consentErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button: Prepare Message */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Prepare Message</span>
                    </button>
                    <p className="text-[11px] text-[#8295A9] mt-2">
                      Formats your inquiry securely in your browser. No data is submitted or stored on external servers.
                    </p>
                  </div>

                </form>

                {/* Formatted Message Preview Block */}
                {previewMessage && (
                  <div 
                    id="contact-preview-panel"
                    role="region" aria-label="Prepared contact inquiry" aria-live="polite" 
                    className="mt-8 pt-8 border-t border-[#E4EBF0] animate-in fade-in-50 duration-200"
                  >
                    <div className="bg-[#071D31] text-white rounded-[18px] p-6 sm:p-7 shadow-lg border border-[#102A43]">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#0d8277]" aria-hidden="true" />
                          <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                            Formatted Message Preview
                          </h3>
                        </div>
                        <span className="text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 w-fit">
                          Ready to Send
                        </span>
                      </div>

                      {/* Monospace Preview */}
                      <pre className="mt-4 p-4 rounded-[12px] bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono break-words whitespace-pre-wrap leading-relaxed select-all">
                        {previewMessage}
                      </pre>

                      <p role="status" className="text-sm text-slate-300 mt-3">{copyError || (copied ? 'Message copied to clipboard.' : '')}</p>
                      {/* Action Buttons */}
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        {/* Copy Message Action */}
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-white hover:bg-slate-100 text-[#071D31] font-bold text-sm transition-all duration-200 shadow-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                              <span className="text-emerald-700">Message Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                              <span>Copy Message</span>
                            </>
                          )}
                        </button>

                        {/* Optional mailto link with clear warning */}
                        <a
                          href={`mailto:hello@smilecare.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(previewMessage)}`}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
                          <span>Open in Email App</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Delivery Warning */}
                      <div className="mt-4 p-3 rounded-[10px] bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p>
                          <strong>Notice:</strong> This opens your email client addressed to <code className="text-[#0d8277]">hello@smilecare.example</code> (demo address). Replace with a live recipient address to ensure delivery. No message has been transmitted through an automated server.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT: LOCATION PANEL & HOURS (Approx 35-40% on Desktop) */}
            <aside 
              aria-labelledby="location-panel-heading"
              className="lg:col-span-5 space-y-6"
            >
              
              {/* Map-like Graphic Placeholder (No unrelated real map embedded) */}
              <div className="bg-white border border-[#E4EBF0] rounded-[20px] overflow-hidden shadow-xs">
                
                <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center border-b border-[#E4EBF0]">
                  {/* Decorative stylized map vector grid background */}
                  <svg 
                    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" 
                    viewBox="0 0 400 250" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#13B8A6" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="#071D31" />
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                    <circle cx="200" cy="125" r="70" fill="none" stroke="#13B8A6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 50 125 L 350 125 M 200 20 L 200 230" stroke="#13B8A6" strokeWidth="1.5" />
                  </svg>

                  {/* Central Pin */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#0d8277] text-white flex items-center justify-center shadow-lg shadow-[#13B8A6]/40 mb-3 animate-pulse">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>

                  {/* Required Map Notice Text */}
                  <div className="relative z-10 bg-white/95 backdrop-blur-xs text-[#071D31] px-4 py-2 rounded-[10px] border border-white/20 shadow-md max-w-[260px]">
                    <p className="text-xs font-bold leading-tight">
                      Connect the business’s actual Google Maps location here
                    </p>
                  </div>

                  <span className="relative z-10 text-[11px] text-slate-400 mt-2">
                    Stylized map placeholder — no tracking cookies loaded
                  </span>
                </div>

                {/* Operating Hours under Map */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0d8277] uppercase tracking-wider">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>HOURS & AVAILABILITY</span>
                  </div>

                  <h3 
                    id="location-panel-heading"
                    className="text-base font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]"
                  >
                    Example opening hours — replace before launch.
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#526477]">
                    <div className="flex items-center justify-between py-1.5 border-b border-[#F7FAFC]">
                      <span>Monday – Friday</span>
                      <span className="font-semibold text-[#102A43]">9:00 AM – 7:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-[#F7FAFC]">
                      <span>Saturday</span>
                      <span className="font-semibold text-[#102A43]">9:00 AM – 4:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span>Sunday</span>
                      <span className="font-semibold text-[#8295A9]">Closed</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-[#8295A9] border-t border-[#F7FAFC]">
                    Adjust hours according to clinical shifts and staff schedules in production.
                  </div>
                </div>

              </div>

              {/* Helpful Guidance Card */}
              <div className="bg-[#E8F8F5]/60 border border-[#13B8A6]/30 rounded-[18px] p-5 space-y-2 text-xs text-[#102A43]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Compass className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                  <span>Planning an In-Person Consultation?</span>
                </div>
                <p className="text-[#526477] leading-relaxed">
                  For prompt consultation scheduling, explore our dedicated booking wizard to specify your treatment focus and ideal date window.
                </p>
                <div className="pt-1">
                  <Link
                    to="/appointment"
                    className="inline-flex items-center gap-1 font-semibold text-[#0d8277] hover:text-[#0d9488]"
                  >
                    <span>Request consultation online</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>

            </aside>

          </div>

        </div>
      </section>

      {/* 4. FAQ: 3 ACCESSIBLE ACCORDION ENTRIES */}
      <section 
        aria-labelledby="contact-faq-heading"
        className="w-full bg-white border-b border-[#E4EBF0] py-16 lg:py-20"
      >
        <div className="app-container w-full max-w-[860px] mx-auto min-w-0">
          
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
              FREQUENT QUESTIONS
            </span>
            <h2 
              id="contact-faq-heading"
              className="text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.18] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3">
              Clear information about clinic communications, inquiries, and consultation planning.
            </p>
          </div>

          {/* Accordion Controls */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              const contentId = `contact-faq-answer-${index}`;
              const buttonId = `contact-faq-button-${index}`;

              return (
                <div
                  key={index}
                  className="bg-[#F7FAFC] border border-[#E4EBF0] rounded-[18px] overflow-hidden transition-all duration-200 hover:border-[#13B8A6]/30 shadow-2xs"
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full px-6 py-5 flex items-center justify-between text-left text-base sm:text-[17px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] min-h-[54px] transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-white text-[#0d8277] flex items-center justify-center flex-shrink-0 transition-transform duration-200 border border-[#E4EBF0] ${isOpen ? 'rotate-180 bg-[#0d8277] text-white border-[#13B8A6]' : ''}`}>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-6 pb-6 pt-1 text-[15px] leading-[1.7] text-[#526477] border-t border-[#E4EBF0] animate-in fade-in-50 duration-150"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8295A9]">
            <HelpCircle className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
            <span>Honest distinction: Online submissions are inquiries, not confirmed appointments.</span>
          </div>

        </div>
      </section>

      {/* 5. FINAL CTA: DARK NAVY BANNER */}
      <section 
        aria-labelledby="contact-cta-heading"
        className="w-full bg-white py-16 lg:py-24 overflow-hidden"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="relative bg-[#071D31] text-white rounded-[28px] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(7,29,49,0.2)] border border-[#102A43]">
            
            <div 
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0d8277]/10 blur-3xl"
              aria-hidden="true"
            />
            <div 
              className="pointer-events-none absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#0d8277]/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102A43] text-[#0d8277] text-xs font-bold uppercase tracking-wider border border-[#13B8A6]/30">
                <span className="w-2 h-2 rounded-full bg-[#0d8277]" aria-hidden="true" />
                <span>START YOUR JOURNEY</span>
              </div>

              {/* Heading */}
              <h2 
                id="contact-cta-heading"
                className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]"
              >
                Ready to Plan Your Visit?
              </h2>

              <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-xl mx-auto">
                Explore our care choices and share your consultation request with our clinical team.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3 max-w-md mx-auto sm:max-w-none">
                {/* Button: Request an Appointment -> /appointment */}
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#071D31] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D31]"
                >
                  <Calendar className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                  <span>Request an Appointment</span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-slate-600 hover:border-slate-400 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                >
                  <span>Explore Our Services</span>
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
                <span>SmileCare Dental Studio demo • Educational demonstration site</span>
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
