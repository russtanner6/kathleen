'use client';

import { useState, FormEvent } from 'react';

type Props = {
  number: string;
  label: string;
  heading: string;
  email: string;
  formspreeId?: string;
  socialLinks: { label: string; url: string }[];
};

export default function Contact({
  number,
  label,
  heading,
  email,
  formspreeId,
  socialLinks,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formspreeId) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="contact-section" id="connect">
      <div className="contact-inner">
        <div className="section-number reveal" data-parallax="0.15">
          {number}
        </div>
        <p className="section-label reveal reveal-delay-1">{label}</p>
        <h2 className="section-heading reveal reveal-delay-2">{heading}</h2>
        <p className="contact-email reveal reveal-delay-3">
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
        <form className="contact-form reveal" onSubmit={onSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="subject" placeholder="What are you called to explore?" />
          <textarea name="message" placeholder="Message" required />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send With Love'}
          </button>
          {status === 'sent' && (
            <p className="form-status">Thank you — your message has been received.</p>
          )}
          {status === 'error' && (
            <p className="form-status">
              {formspreeId
                ? 'Something went wrong. Please email directly.'
                : `Please email ${email} directly.`}
            </p>
          )}
        </form>
        <div className="social-links reveal">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
