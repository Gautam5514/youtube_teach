import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAppointment, createReminder, SERVICE_OPTIONS } from '../src/lib/inquiry.js';
import { SERVICES } from '../src/data/servicesData.js';
const valid = { fullName: 'Demo Visitor', mobileNumber: '9876543210', email: 'demo@example.com', service: 'General Dentistry', preferredDate: '2026-10-28', timeWindow: '9 AM–12 PM', message: '', consent: true };
test('valid inquiry accepts all shared service names and Not Sure', () => {
  assert.deepEqual(SERVICE_OPTIONS, [...SERVICES.map(s => s.name), 'Not Sure']);
  for (const service of SERVICE_OPTIONS) assert.deepEqual(validateAppointment({ ...valid, service }, '2026-10-26'), {});
});
test('required fields reject incomplete inquiries', () => {
  const errors = validateAppointment({ fullName: '', mobileNumber: '', email: '', service: '', preferredDate: '', timeWindow: '', message: '', consent: false }, '2026-10-26');
  assert.deepEqual(Object.keys(errors), ['fullName', 'mobileNumber', 'service', 'preferredDate', 'timeWindow', 'consent']);
});
test('rejects invalid phones, emails, dates and forged service/time values', () => {
  for (const phone of ['1234567890', '987654321', '98765432100', 'abcdefghij']) assert.ok(validateAppointment({ ...valid, mobileNumber: phone }, '2026-10-26').mobileNumber);
  assert.ok(validateAppointment({ ...valid, email: 'not-an-email' }, '2026-10-26').email);
  for (const date of ['2026-10-25', '2026-02-30', 'abc', '2026-13-01']) assert.ok(validateAppointment({ ...valid, preferredDate: date }, '2026-10-26').preferredDate);
  assert.ok(validateAppointment({ ...valid, timeWindow: 'midnight', service: 'fake' }, '2026-10-26').timeWindow);
});
test('accepts today and optional blank email; rejects long notes and missing consent', () => {
  assert.deepEqual(validateAppointment({ ...valid, preferredDate: '2026-10-26', email: '' }, '2026-10-26'), {});
  const errors = validateAppointment({ ...valid, message: 'x'.repeat(501), consent: false }, '2026-10-26');
  assert.ok(errors.message); assert.ok(errors.consent);
});
test('calendar reminder handles year rollover, excludes personal details, and never confirms a visit', () => {
  const result = createReminder('2026-12-31', new Date('2026-10-26T10:00:00Z'));
  assert.match(result, /DTSTART;VALUE=DATE:20261231/);
  assert.match(result, /DTEND;VALUE=DATE:20270101/);
  assert.match(result, /STATUS:TENTATIVE/);
  assert.match(result, /No appointment has been booked/);
  assert.doesNotMatch(result, /9876543210|Demo Visitor|demo@example.com/);
  assert.throws(() => createReminder('2026-02-30'));
  assert.throws(() => createReminder('2026-10-26\r\nSUMMARY:Injected'));
});
