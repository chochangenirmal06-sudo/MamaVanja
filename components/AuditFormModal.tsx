'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type AuditFormData = {
  name: string;
  email: string;
  company: string;
  website: string;
};

type FormErrors = Partial<Record<keyof AuditFormData, string>>;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(normalizeUrl(url));
    return parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  fontWeight: 500,
  color: 'var(--brand-dark-green)',
  marginBottom: 6,
};

const errorStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8125rem',
  color: '#DC2626',
  marginTop: 5,
};

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 8,
    border: `1.5px solid ${hasError ? '#DC2626' : 'rgba(15, 61, 46, 0.2)'}`,
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: 'var(--brand-dark-green)',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 150ms ease',
  };
}

export function AuditFormModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<AuditFormData>({ name: '', email: '', company: '', website: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => firstInputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim())               errs.name    = 'Full name is required';
    if (!isValidEmail(form.email))       errs.email   = 'Enter a valid email address';
    if (!form.company.trim())            errs.company = 'Company name is required';
    if (!form.website.trim())            errs.website = 'Website URL is required';
    else if (!isValidUrl(form.website))  errs.website = 'Enter a valid URL (e.g. yoursite.com)';
    return errs;
  }

  function handleChange(field: keyof AuditFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName:    form.name,
          email:       form.email,
          companyName: form.company,
          websiteUrl:  normalizeUrl(form.website),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push('/free-audit/thank-you');
    } catch (err) {
      console.error('[AuditFormModal] submit error:', err);
      setLoading(false);
      setSubmitError(
        'Something went wrong — please try again or email us directly at nirmal.mamavanja@gmail.com'
      );
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="audit-modal"
          style={{ position: 'fixed', inset: 0, zIndex: 200 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.55)' }}
          />

          {/* Centering shell */}
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="audit-modal-title"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                pointerEvents: 'auto',
                position: 'relative',
                width: '100%',
                maxWidth: 520,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#fff',
                borderRadius: 20,
                padding: '40px 36px',
                boxSizing: 'border-box',
                boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid rgba(15, 61, 46, 0.15)',
                  background: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--brand-dark-green)', opacity: 0.6,
                  fontSize: '1.25rem', lineHeight: 1, fontFamily: 'sans-serif',
                }}
              >
                ×
              </button>

              <h2
                id="audit-modal-title"
                className="font-display text-brand-dark-green"
                style={{ fontSize: '1.6rem', lineHeight: 1.2, fontWeight: 400, marginBottom: 8 }}
              >
                Get Your Free SEO Audit
              </h2>
              <p
                className="font-sans text-brand-dark-green"
                style={{ fontSize: '0.9375rem', opacity: 0.65, lineHeight: 1.6, marginBottom: 28 }}
              >
                Fill in your details and we&apos;ll get back to you with a full review.
              </p>

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                <div>
                  <label htmlFor="audit-name" style={labelStyle}>Full Name</label>
                  <input
                    ref={firstInputRef}
                    id="audit-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    style={inputStyle(!!errors.name)}
                    placeholder="Jane Smith"
                  />
                  {errors.name && <span role="alert" style={errorStyle}>{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="audit-email" style={labelStyle}>Email Address</label>
                  <input
                    id="audit-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    style={inputStyle(!!errors.email)}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span role="alert" style={errorStyle}>{errors.email}</span>}
                </div>

                <div>
                  <label htmlFor="audit-company" style={labelStyle}>Company Name</label>
                  <input
                    id="audit-company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={e => handleChange('company', e.target.value)}
                    style={inputStyle(!!errors.company)}
                    placeholder="Smith Plumbing Co."
                  />
                  {errors.company && <span role="alert" style={errorStyle}>{errors.company}</span>}
                </div>

                <div>
                  <label htmlFor="audit-website" style={labelStyle}>Website URL</label>
                  <input
                    id="audit-website"
                    type="text"
                    autoComplete="url"
                    value={form.website}
                    onChange={e => handleChange('website', e.target.value)}
                    style={inputStyle(!!errors.website)}
                    placeholder="yoursite.com"
                  />
                  {errors.website && <span role="alert" style={errorStyle}>{errors.website}</span>}
                </div>

                {submitError && (
                  <p
                    role="alert"
                    className="font-sans"
                    style={{ fontSize: '0.875rem', color: '#DC2626', margin: 0, lineHeight: 1.5 }}
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn--primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    padding: '0.9rem 1.5rem',
                    marginTop: 4,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Sending…' : 'Request My Free Audit'}
                </button>

              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
