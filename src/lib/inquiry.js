import { SERVICES } from '../data/servicesData.js';

export const SERVICE_OPTIONS = [...SERVICES.map(({ name }) => name), 'Not Sure'];
export const TIME_WINDOWS = [
  { id: 'morning', label: '9 AM–12 PM', description: 'Morning consultation' },
  { id: 'afternoon', label: '12 PM–4 PM', description: 'Afternoon consultation' },
  { id: 'evening', label: '4 PM–7 PM', description: 'Evening consultation' },
];

export function localDateString(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function validateAppointment(values, today = localDateString()) {
  const errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = 'Please enter your full name (at least 2 characters).';
  if (!/^[6-9]\d{9}$/.test(values.mobileNumber)) errors.mobileNumber = 'Enter a valid 10-digit Indian number starting with 6, 7, 8, or 9.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!SERVICE_OPTIONS.includes(values.service)) errors.service = 'Please select a dental service option.';
  const date = values.preferredDate;
  const parsed = new Date(`${date}T12:00:00`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || localDateString(parsed) !== date || date < today) errors.preferredDate = 'Choose a valid date today or later.';
  if (!TIME_WINDOWS.some(({ label }) => label === values.timeWindow)) errors.timeWindow = 'Please select a preferred time window.';
  if (values.message.length > 500) errors.message = 'Keep additional notes within 500 characters.';
  if (!values.consent) errors.consent = 'You must agree to share your information for an appointment inquiry.';
  return errors;
}

// A private, all-day follow-up reminder: never represents a confirmed visit.
export function createReminder(date, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid reminder date');
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime()) || localDateString(parsed) !== date) throw new Error('Invalid reminder date');
  const end = new Date(parsed);
  end.setDate(end.getDate() + 1);
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SmileCare Demo//Inquiry Reminder//EN',
    'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:${now.getTime()}-${date}@smilecare.example`,
    `DTSTAMP:${now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;VALUE=DATE:${date.replaceAll('-', '')}`,
    `DTEND;VALUE=DATE:${localDateString(end).replaceAll('-', '')}`,
    'SUMMARY:Follow up on dental inquiry (demo)',
    'DESCRIPTION:Personal reminder only. No appointment has been booked.',
    'STATUS:TENTATIVE', 'TRANSP:TRANSPARENT', 'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
}

export function downloadReminder(date) {
  const url = URL.createObjectURL(new Blob([createReminder(date)], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'smilecare-follow-up.ics';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
