import React, { useState, useId } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Copy, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Send,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { DEMO_WHATSAPP_NUMBER } from '../data/clinicData';

import { SERVICE_OPTIONS, TIME_WINDOWS, localDateString, validateAppointment, downloadReminder } from '../lib/inquiry';
import { copyText } from '../lib/clipboard';

export default function AppointmentPage() {
  const [searchParams] = useSearchParams();
  const todayStr = localDateString();

  // Unique IDs for aria-describedby accessibility
  const nameErrorId = useId();
  const phoneErrorId = useId();
  const emailErrorId = useId();
  const serviceErrorId = useId();
  const dateErrorId = useId();
  const timeErrorId = useId();
  const consentErrorId = useId();

  // Preselect service gracefully from ?service= directly on initial state
  const queryService = searchParams.get('service');
  const matchedService = queryService
    ? (SERVICE_OPTIONS.find((opt) => opt.toLowerCase() === queryService.trim().toLowerCase()) || '')
    : '';

  // Controlled form states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(matchedService);
  const [preferredDate, setPreferredDate] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Form interaction & validation states
  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [submittedDate, setSubmittedDate] = useState('');

  // Reject non-numeric input for Indian mobile number on typing
  const handleMobileChange = (e) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(digitsOnly);
    if (errors.mobileNumber) {
      setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = validateAppointment({ fullName, mobileNumber, email, service, preferredDate, timeWindow, message, consent });

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, newErrors };
  };

  // Build encoded structured WhatsApp message
  const generateWhatsAppMessage = () => {
    const lines = [
      '🦷 *SmileCare Dental Studio — Appointment Inquiry*',
      '',
      `• *Full Name:* ${fullName.trim()}`,
      `• *Mobile Number:* +91 ${mobileNumber}`,
      `• *Email:* ${email.trim() ? email.trim() : 'Not provided'}`,
      `• *Service Requested:* ${service}`,
      `• *Preferred Date:* ${preferredDate}`,
      `• *Preferred Time Window:* ${timeWindow}`,
      `• *Additional Notes:* ${message.trim() ? message.trim() : 'None'}`,
      '',
      '_Note: This is an appointment inquiry for our demonstration clinic. Preferred times are requests only and subject to clinic confirmation._',
    ];
    return lines.join('\n');
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validateForm();

    if (!isValid) {
      // Focus first error field for accessibility
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(firstErrorKey) || document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) {
        el.focus();
      }
      return;
    }

    // Generate formatted inquiry
    const formatted = generateWhatsAppMessage();
    setSubmittedMessage(formatted);
    setSubmittedDate(preferredDate);
    setCopyError('');
    setCopied(false);

    // Scroll to preview smoothly
    setTimeout(() => {
      const previewEl = document.getElementById('inquiry-preview-section');
      if (previewEl) {
        previewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // Copy to clipboard handler
  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    const success = await copyText(submittedMessage);
    setCopied(success);
    setCopyError(success ? '' : 'Copy was blocked. Select the preview text and copy it manually.');

  };

  return (
    <div className="flex-grow flex flex-col justify-start">
      
      {/* 1. HERO SECTION */}
      <section 
        aria-label="Appointment Request Overview"
        className="w-full bg-[#E8F8F5] border-b border-[#E4EBF0] py-12 sm:py-16 flex items-center justify-center text-center"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Linked Breadcrumb: Home / Book Appointment */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-[#526477] mb-4">
            <Link to="/" className="hover:text-[#102A43] font-medium transition-colors">
              Home
            </Link>
            <span className="text-[#8295A9]">/</span>
            <span className="text-[#0d8277] font-semibold">Book Appointment</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5 shadow-2xs">
            APPOINTMENT INQUIRY
          </span>

          {/* Heading h1 */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Request Your Appointment
          </h1>

          {/* Supportive Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Share your details and prepare a message for the clinic.
          </p>

        </div>
      </section>

      {/* 2. MAIN CONTENT: 2-COLUMN LAYOUT (65% Form / 35% Information on Desktop) */}
      <section 
        aria-label="Appointment Inquiry Form and Guidance"
        className="w-full bg-[#F7FAFC] py-12 sm:py-16 lg:py-20"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-start">
            
            {/* LEFT COLUMN: 65% FORM CONTAINER */}
            <div className="lg:col-span-8 min-w-0">
              <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-6 sm:p-10 shadow-[0_10px_30px_rgba(16,42,69,0.06)]">
                
                {/* Form Header Info */}
                <div className="border-b border-[#E4EBF0] pb-6 mb-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0d8277] uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>CONSULTATION INQUIRY</span>
                  </div>
                  <h2 className="text-2xl sm:text-[26px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                    Inquiry Details
                  </h2>
                  <p className="text-sm text-[#526477] mt-1 leading-relaxed">
                    Please provide your contact information and consultation preferences below. Required fields are marked with an asterisk (<span className="text-red-500">*</span>).
                  </p>
                </div>

                {/* Native Semantic Form */}
                <form onSubmit={handleSubmit} onChange={() => { setSubmittedMessage(null); setCopied(false); setCopyError(''); }} noValidate className="space-y-6">
                  
                  {/* Row 1: Full Name & Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div>
                      <label 
                        htmlFor="fullName" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="e.g. Priya Sharma"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? nameErrorId : undefined}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                          errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      />
                      {errors.fullName && (
                        <p id={nameErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label 
                        htmlFor="mobileNumber" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Mobile Number (India) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#526477] pointer-events-none">
                          +91
                        </span>
                        <input
                          id="mobileNumber"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={10}
                          autoComplete="tel-national"
                          value={mobileNumber}
                          onChange={handleMobileChange}
                          placeholder="9876543210"
                          aria-required="true"
                          aria-invalid={!!errors.mobileNumber}
                          aria-describedby={phoneErrorId}
                          className={`w-full min-h-[48px] h-12 pl-12 pr-4 rounded-[12px] bg-white border text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                            errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                          }`}
                        />
                      </div>
                      <p id={phoneErrorId} className={`text-xs mt-1.5 ${errors.mobileNumber ? 'text-red-600 font-medium flex items-center gap-1' : 'text-[#8295A9]'}`}>
                        {errors.mobileNumber ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                            <span>{errors.mobileNumber}</span>
                          </>
                        ) : (
                          'Accepted format: 10 digits starting with 6, 7, 8, or 9.'
                        )}
                      </p>
                    </div>

                  </div>

                  {/* Row 2: Email & Service Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Email (Optional) */}
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Email Address <span className="text-xs font-normal text-[#8295A9] normal-case">(Optional)</span>
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
                        placeholder="e.g. priya@example.com"
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

                    {/* Service Select */}
                    <div>
                      <label 
                        htmlFor="service" 
                        className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                      >
                        Service Requested <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                          if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? serviceErrorId : undefined}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] cursor-pointer ${
                          errors.service ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      >
                        <option value="">Select a service...</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p id={serviceErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.service}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Row 3: Preferred Date */}
                  <div>
                    <label 
                      htmlFor="preferredDate" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2"
                    >
                      Preferred Consultation Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="preferredDate"
                        type="date"
                        min={todayStr}
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) setErrors((prev) => ({ ...prev, preferredDate: undefined }));
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.preferredDate}
                        aria-describedby={dateErrorId}
                        className={`w-full min-h-[48px] h-12 px-4 rounded-[12px] bg-white border text-sm text-[#102A43] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                          errors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-[#E4EBF0] hover:border-[#13B8A6]/40'
                        }`}
                      />
                    </div>
                    <p id={dateErrorId} className={`text-xs mt-1.5 ${errors.preferredDate ? 'text-red-600 font-medium flex items-center gap-1' : 'text-[#8295A9]'}`}>
                      {errors.preferredDate ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{errors.preferredDate}</span>
                        </>
                      ) : (
                        'Select a requested date on or after today. Does not assert immediate availability.'
                      )}
                    </p>
                  </div>

                  {/* Row 4: Preferred Time Window */}
                  <div>
                    <span 
                      id="time-window-label" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2.5"
                    >
                      Preferred Time Window <span className="text-red-500">*</span>
                    </span>
                    
                    <div 
                      role="radiogroup" 
                      aria-labelledby="time-window-label"
                      aria-describedby={errors.timeWindow ? timeErrorId : undefined}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      {TIME_WINDOWS.map((window) => {
                        const isSelected = timeWindow === window.label;
                        return (
                          <label
                            key={window.id}
                            className={`relative cursor-pointer focus-within:ring-2 focus-within:ring-teal p-3.5 rounded-[12px] border text-left transition-all duration-200 flex flex-col justify-between min-h-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] ${
                              isSelected
                                ? 'border-[#13B8A6] bg-[#E8F8F5] shadow-2xs'
                                : 'border-[#E4EBF0] bg-white hover:border-[#13B8A6]/40'
                            }`}
                          >
                            <input type="radio" name="timeWindow" value={window.label} checked={isSelected} onChange={() => { setTimeWindow(window.label); setErrors(prev => ({ ...prev, timeWindow: undefined })); }} className="absolute right-3.5 top-4 w-4 h-4 accent-[#0d8277]" />
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm font-bold text-[#102A43]">
                                {window.label}
                              </span>

                            </div>
                            <span className="text-[11px] text-[#526477] mt-1">
                              {window.description}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {errors.timeWindow && (
                      <p id={timeErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span>{errors.timeWindow}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 5: Additional Message (Optional, max 500 chars) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label 
                        htmlFor="message" 
                        className="text-xs font-bold uppercase tracking-wider text-[#102A43]"
                      >
                        Additional Message <span className="text-xs font-normal text-[#8295A9] normal-case">(Optional)</span>
                      </label>
                      <span className="text-xs text-[#8295A9]">
                        {message.length} / 500
                      </span>
                    </div>
                    <textarea
                      id="message"
                      rows={3}
                      maxLength={500}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share any specific dental questions, past concerns, or timing preferences you have..."
                      className="w-full p-4 rounded-[12px] bg-white border border-[#E4EBF0] hover:border-[#13B8A6]/40 text-sm text-[#102A43] placeholder-[#8295A9] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                    />
                  </div>

                  {/* Row 6: Required Explicit Consent Checkbox */}
                  <div className="pt-2">
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
                        I agree to share my information for an appointment inquiry. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id={consentErrorId} className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
                    >
                      <MessageSquare className="w-5 h-5" aria-hidden="true" />
                      <span>Prepare WhatsApp Request</span>
                    </button>
                    <p className="text-[11px] text-center text-[#8295A9] mt-2.5">
                      No server transmission or database storage occurs. Formats an inquiry message for direct communication.
                    </p>
                  </div>

                </form>

                {/* 3. GENERATED INQUIRY PREVIEW SECTION */}
                {submittedMessage && (
                  <div 
                    id="inquiry-preview-section"
                    role="region" aria-label="Prepared appointment inquiry" aria-live="polite" 
                    className="mt-10 pt-8 border-t border-[#E4EBF0] animate-in fade-in-50 duration-200"
                  >
                    <div className="bg-[#071D31] text-white rounded-[18px] p-6 sm:p-7 shadow-lg border border-[#102A43]">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#0d8277]" aria-hidden="true" />
                          <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                            Structured Inquiry Preview
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 w-fit">
                          Ready for WhatsApp
                        </span>
                      </div>

                      {/* Monospace Message Text Block */}
                      <pre className="mt-4 p-4 rounded-[12px] bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono break-words whitespace-pre-wrap leading-relaxed select-all">
                        {submittedMessage}
                      </pre>

                      {/* Action Row */}
                      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        
                        {/* Copy Button */}
                        <button
                          type="button"
                          onClick={handleCopyMessage}
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

                        {/* Direct WhatsApp Link IF business number configured */}
                        {DEMO_WHATSAPP_NUMBER ? (
                          <a
                            href={`https://wa.me/${DEMO_WHATSAPP_NUMBER}?text=${encodeURIComponent(submittedMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <Send className="w-4 h-4" aria-hidden="true" />
                            <span>Open in WhatsApp</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        ) : (
                          <div className="text-xs text-slate-300 flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
                            <span>Demo mode: Copy the text above and send it to our clinic chat.</span>
                          </div>
                        )}

                      </div>

                      <p role="status" className="text-sm text-slate-300 mt-3">{copyError || (copied ? 'Message copied to clipboard.' : '')}</p>
                      <button type="button" onClick={() => downloadReminder(submittedDate)} className="mt-4 text-sm font-semibold text-[#5eead4] underline underline-offset-4 min-h-11">Download follow-up reminder (.ics)</button>
                      <p className="text-xs text-slate-400">A personal calendar reminder, without contact details. No visit is booked.</p>
                      {/* Clarification that user must send inside WhatsApp */}
                      <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800">
                        {DEMO_WHATSAPP_NUMBER 
                          ? 'Note: Clicking "Open in WhatsApp" prepares this message in your chat. You must press send inside WhatsApp to dispatch your inquiry.'
                          : 'Live business WhatsApp line is unconfigured in this demo. Paste this formatted message directly to your provider or receptionist.'
                        }
                      </p>

                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN: 35% INFORMATION SIDEBAR */}
            <aside 
              aria-labelledby="sidebar-guide-heading"
              className="lg:col-span-4 space-y-6"
            >
              
              {/* Card 1: Before Your Visit - 3 Illustrated Steps */}
              <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0d8277] uppercase tracking-wider">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>STEP-BY-STEP PROCESS</span>
                </div>

                <h2 
                  id="sidebar-guide-heading"
                  className="text-xl font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
                >
                  Before Your Visit
                </h2>

                <p className="text-xs text-[#526477] leading-relaxed">
                  Our clinic uses a streamlined three-step inquiry process to review dental care needs:
                </p>

                {/* 3 Illustrated Steps */}
                <ol className="space-y-4 pt-1">
                  
                  {/* Step 1 */}
                  <li className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-[#E8F8F5] text-[#0d8277] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#13B8A6]/20 mt-0.5">
                      1
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#102A43]">
                        Choose Service
                      </h3>
                      <p className="text-xs text-[#526477] mt-0.5 leading-normal">
                        Select the care option that best matches what you want to explore or choose "Not Sure".
                      </p>
                    </div>
                  </li>

                  {/* Step 2 */}
                  <li className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-[#E8F8F5] text-[#0d8277] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#13B8A6]/20 mt-0.5">
                      2
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#102A43]">
                        Share Details
                      </h3>
                      <p className="text-xs text-[#526477] mt-0.5 leading-normal">
                        Provide your mobile number and select your preferred date and time window.
                      </p>
                    </div>
                  </li>

                  {/* Step 3 */}
                  <li className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-[#E8F8F5] text-[#0d8277] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#13B8A6]/20 mt-0.5">
                      3
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#102A43]">
                        Send Inquiry
                      </h3>
                      <p className="text-xs text-[#526477] mt-0.5 leading-normal">
                        Review the prepared message and send it through WhatsApp to connect with our team.
                      </p>
                    </div>
                  </li>

                </ol>
              </div>

              {/* Card 2: Example Clinic Hours (Labelled Example - No fake location or phone number) */}
              <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-6 sm:p-7 shadow-xs space-y-4">
                
                <div className="flex items-center gap-2 text-xs font-bold text-[#0d8277] uppercase tracking-wider">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>SCHEDULE INFORMATION</span>
                </div>

                <h3 className="text-base font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                  Example clinic hours
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F7FAFC]">
                    <span className="text-[#526477]">Monday – Friday</span>
                    <span className="font-semibold text-[#102A43]">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-[#F7FAFC]">
                    <span className="text-[#526477]">Saturday</span>
                    <span className="font-semibold text-[#102A43]">9:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[#526477]">Sunday</span>
                    <span className="font-semibold text-[#8295A9]">Closed</span>
                  </div>
                </div>

                {/* Required Short Note */}
                <div className="p-3.5 rounded-[12px] bg-[#E8F8F5] border border-[#13B8A6]/20 flex items-start gap-2.5">
                  <CalendarIcon className="w-4 h-4 text-[#0d8277] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs text-[#102A43] leading-relaxed">
                    <strong>Note:</strong> Preferred times are requests only. Our clinic coordinator will discuss and confirm actual visit slots.
                  </p>
                </div>

              </div>

              {/* Card 3: Demo Safety Reminder */}
              <div className="bg-[#F7FAFC] border border-[#E4EBF0] rounded-[18px] p-5 text-xs text-[#526477] space-y-2">
                <div className="flex items-center gap-1.5 text-[#102A43] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                  <span>Demonstration Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  No automated booking engine or payment processor is attached to this lesson demo. Submitting prepares a client-side text summary for personal messaging.
                </p>
              </div>

            </aside>

          </div>

        </div>
      </section>

    </div>
  );
}
