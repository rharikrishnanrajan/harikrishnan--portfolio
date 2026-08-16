import React, { FormEvent, useState } from 'react';
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
type SubmitStatus = 'idle' | 'success';

const EMPTY_FORM: ContactPayload = { name: '', email: '', subject: '', message: '' };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactPayload): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.subject.trim().length < 3) {
    errors.subject = 'Please add a subject (at least 3 characters).';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message (at least 10 characters).';
  }

  return errors;
}

export const Contact: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });
  const [values, setValues] = useState<ContactPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (field: FieldName, value: string): void => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(values.subject.trim());
    const body = encodeURIComponent(
      `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\nMessage:\n${values.message.trim()}`
    );
    const mailtoUrl = `mailto:${personal.email}?subject=${subject}&body=${body}`;

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
              {status === 'success' ? (
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
