import React, { FormEvent, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { personal } from '../data/seed';
import { useReveal } from '../hooks/useReveal';
import { ContactPayload } from '../types/portfolio';

type FieldName = 'name' | 'email' | 'subject' | 'message';
type FormErrors = Partial<Record<FieldName, string>>;
type SubmitStatus = 'idle' | 'success' | 'rate-limited';

const EMPTY_FORM: ContactPayload = { name: '', email: '', subject: '', message: '' };

// ── Security: Input length caps to prevent payload injection ─────────────────
const FIELD_MAX_LENGTHS: Record<FieldName, number> = {
  name: 100,
  email: 254,   // RFC 5321 maximum email length
  subject: 200,
  message: 2000,
};

// ── Security: Rate limiting — 60 seconds between submissions ─────────────────
const RATE_LIMIT_MS = 60_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize a string for safe inclusion in a mailto: URL body.
 * Strips control characters and trims whitespace to prevent header injection.
 */
function sanitizeField(value: string): string {
  return value
    .trim()
    // Remove ASCII control characters (0x00-0x1F, 0x7F) that could break mailto headers
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Collapse multiple consecutive whitespace into single space
    .replace(/\s{3,}/g, '  ');
}

function validate(values: ContactPayload): FormErrors {
  const errors: FormErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  } else if (name.length > FIELD_MAX_LENGTHS.name) {
    errors.name = `Name must be under ${FIELD_MAX_LENGTHS.name} characters.`;
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (email.length > FIELD_MAX_LENGTHS.email) {
    errors.email = `Email address is too long.`;
  }

  if (subject.length < 3) {
    errors.subject = 'Please add a subject (at least 3 characters).';
  } else if (subject.length > FIELD_MAX_LENGTHS.subject) {
    errors.subject = `Subject must be under ${FIELD_MAX_LENGTHS.subject} characters.`;
  }

  if (message.length < 10) {
    errors.message = 'Please write a message (at least 10 characters).';
  } else if (message.length > FIELD_MAX_LENGTHS.message) {
    errors.message = `Message must be under ${FIELD_MAX_LENGTHS.message} characters.`;
  }

  return errors;
}

export const Contact: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });
  const [values, setValues] = useState<ContactPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  // ── Security: Honeypot ref — hidden from humans, filled by bots ───────────
  const honeypotRef = useRef<HTMLInputElement>(null);

  // ── Security: Rate limiting — track last submission timestamp ─────────────
  const lastSubmitRef = useRef<number>(0);

  const handleChange = (field: FieldName, value: string): void => {
    // Enforce max length on change to prevent paste-overflow attacks
    const capped = value.slice(0, FIELD_MAX_LENGTHS[field]);
    setValues((current) => ({ ...current, [field]: capped }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // ── Security Layer 1: Honeypot check ─────────────────────────────────────
    // If the hidden honeypot field has any value, this is almost certainly a bot.
    // We silently pretend success to avoid tipping off the attacker.
    if (honeypotRef.current?.value) {
      setStatus('success');
      return;
    }

    // ── Security Layer 2: Client-side rate limiting ───────────────────────────
    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      setStatus('rate-limited');
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // ── Security Layer 3: Sanitize all fields before building mailto: URL ─────
    const cleanName = sanitizeField(values.name);
    const cleanEmail = sanitizeField(values.email);
    const cleanSubject = sanitizeField(values.subject);
    const cleanMessage = sanitizeField(values.message);

    const subject = encodeURIComponent(cleanSubject);
    const body = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`
    );
    const mailtoUrl = `mailto:${personal.email}?subject=${subject}&body=${body}`;

    lastSubmitRef.current = now;
    window.location.href = mailtoUrl;
    setStatus('success');
  };

  const handleReset = (): void => {
    setValues(EMPTY_FORM);
    setErrors({});
    setStatus('idle');
  };

  const inputClass = (hasError: boolean): string =>
    `w-full rounded-none border bg-surface px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground-muted/50 transition-colors focus:outline-none ${
      hasError
        ? 'border-red-500 focus:border-red-500'
        : 'border-border focus:border-foreground'
    }`;

  return (
    <section ref={sectionRef} id="contact" className="border-b border-border bg-background transition-colors duration-200">
      <div className="container-portfolio py-20 md:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5">
            <div data-reveal>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-foreground-muted">06</span>
                <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
                <span className="eyebrow">connect</span>
              </div>
              <h2 className="section-heading mt-4">Let&apos;s Build Something Reliable</h2>
            </div>

            <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-foreground-secondary">
              Available for DevOps engineering roles, cloud infrastructure design, and automation opportunities.
            </p>

            <ul data-reveal className="mt-10 space-y-1">
              <li className="flex items-center gap-3 border-t border-border py-4">
                <Mail className="h-4 w-4 text-foreground shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
                >
                  {personal.email}
                </a>
              </li>
              <li className="flex items-center gap-3 border-t border-border py-4">
                <Phone className="h-4 w-4 text-foreground shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
                >
                  {personal.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 border-t border-border py-4">
                <MapPin className="h-4 w-4 text-foreground shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground-secondary">{personal.location}</span>
              </li>
              <li className="flex items-center gap-3 border-t border-border py-4">
                <Github className="h-4 w-4 text-foreground shrink-0" aria-hidden="true" />
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
                >
                  github.com/rharikrishnanrajan
                </a>
              </li>
              <li className="flex items-center gap-3 border-t border-border py-4">
                <Linkedin className="h-4 w-4 text-foreground shrink-0" aria-hidden="true" />
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
                >
                  linkedin.com/in/rharikrishnanrajan
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div data-reveal>
              {status === 'rate-limited' ? (
                <div
                  role="alert"
                  className="flex min-h-40 flex-col items-start justify-center border border-amber-400/40 bg-amber-50/10 p-8"
                >
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Please wait before sending another message.
                  </p>
                  <p className="mt-2 text-xs text-foreground-muted">
                    You can submit again in about a minute. This helps keep the
                    form free from automated spam.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary mt-6"
                  >
                    Go back
                  </button>
                </div>
              ) : status === 'success' ? (
                <div
                  role="status"
                  className="flex min-h-96 flex-col items-start justify-center border border-border bg-surface p-8 md:p-12"
                >
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" aria-hidden="true" />
                  <h3 className="mt-5 font-sans text-2xl font-bold tracking-tight text-foreground">
                    Email client launched.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground-secondary">
                    Your email application was opened with the pre-filled message. You can send it directly from there.
                  </p>
                  <p className="mt-2 max-w-md text-xs text-foreground-muted">
                    If your email client didn&apos;t launch automatically, you can send an email directly to:
                  </p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-tag text-foreground hover:underline"
                  >
                    {personal.email}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button type="button" onClick={handleReset} className="btn-secondary mt-10">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">

                  {/*
                    ── Security: Honeypot field ─────────────────────────────────
                    Visually hidden via CSS (NOT display:none / visibility:hidden
                    because many bots detect those).
                    Real users never see or interact with this field.
                    If it has a value on submit → bot detected → silent drop.
                    aria-hidden prevents screen readers from announcing it.
                  */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                      opacity: 0,
                      pointerEvents: 'none',
                      tabIndex: -1,
                    } as React.CSSProperties}
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      ref={honeypotRef}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="eyebrow block">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={FIELD_MAX_LENGTHS.name}
                        className={`mt-2 ${inputClass(Boolean(errors.name))}`}
                        placeholder="Your name"
                        value={values.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-2 font-mono text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="eyebrow block">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={FIELD_MAX_LENGTHS.email}
                        className={`mt-2 ${inputClass(Boolean(errors.email))}`}
                        placeholder="you@domain.com"
                        value={values.email}
                        onChange={(event) => handleChange('email', event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-2 font-mono text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="eyebrow block">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      maxLength={FIELD_MAX_LENGTHS.subject}
                      className={`mt-2 ${inputClass(Boolean(errors.subject))}`}
                      placeholder="e.g. DevOps Role / Cloud Architecture Inquiry"
                      value={values.subject}
                      onChange={(event) => handleChange('subject', event.target.value)}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="mt-2 font-mono text-xs text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="eyebrow block">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={FIELD_MAX_LENGTHS.message}
                      className={`mt-2 resize-y ${inputClass(Boolean(errors.message))}`}
                      placeholder="Describe your project, systems requirements, or opportunity..."
                      value={values.message}
                      onChange={(event) => handleChange('message', event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-2 font-mono text-xs text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

