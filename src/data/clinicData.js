/**
 * SmileCare Dental Studio - Clinic Shared Data
 * NOTE: All data is fictional for educational demo purposes.
 */

export const CLINIC_INFO = {
  name: 'SmileCare Dental Studio',
  shortName: 'SmileCare',
  tagline: 'Modern, gentle dentistry in a serene clinical environment.',
  badge: 'DEMO CLINIC',
  demoNotice: 'Fictional demo dental clinic built for educational lessons. No real appointments or treatments are processed.',
  phone: '+1 (555) 019-2834',
  email: 'hello@smilecare.example',
  address: {
    street: '123 Fiction Parkway, Suite 400',
    city: 'Demo Hills',
    state: 'CA',
    zip: '90210',
    full: '123 Fiction Parkway, Suite 400, Demo Hills, CA 90210',
  },
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 4:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  emergencyNote: 'This fictional clinic does not provide emergency services.',
};

/**
 * Business WhatsApp Number Configuration
 * Leave empty string '' to operate in Demo / Copy-to-Clipboard preview mode.
 * Set to international numeric format (e.g. '919876543210') to enable direct wa.me links.
 */
export const DEMO_WHATSAPP_NUMBER = '';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Contact', path: '/contact' },
];

export const CTA_APPOINTMENT = {
  label: 'Book Appointment',
  path: '/appointment',
};
