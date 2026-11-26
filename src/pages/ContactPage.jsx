import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import SocialIcon from '../components/SocialIcon';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { contact } from '../data';
import '../styles/ContactPage.css';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactPage = () => {
  useDocumentTitle('Contact');
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in your name, email and message.' });
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Request failed');

      setStatus({ state: 'success', message: "Thanks, your message is on its way. I'll reply within a day or two." });
      setForm(EMPTY);
    } catch {
      setStatus({
        state: 'error',
        message: `Sorry, the message didn't go through. You can email me directly at ${contact.email}.`,
      });
    }
  };

  const sending = status.state === 'sending';

  return (
    <div className="page container contact">
      <FadeIn className="page-header">
        <span className="eyebrow">Contact</span>
        <h1>Let&apos;s talk</h1>
        <p>
          Hiring for a senior frontend role, or need help with a React or Vue codebase?
          Send a note and I&apos;ll get back to you within a day or two.
        </p>
      </FadeIn>

      <div className="contact-grid">
        <FadeIn as="aside" className="contact-direct">
          <h2>Reach me directly</h2>
          <ul>
            <li>
              <a href={`mailto:${contact.email}`}>
                <SocialIcon name="email" className="contact-icon" />
                <span>
                  <strong>Email</strong>
                  <span>{contact.email}</span>
                </span>
              </a>
            </li>
            {contact.socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={s.icon} className="contact-icon" />
                  <span>
                    <strong>{s.name}</strong>
                    <span>{s.display}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={contact.resume.url} download={contact.resume.fileName}>
                <SocialIcon name="resume" className="contact-icon" />
                <span>
                  <strong>Résumé</strong>
                  <span>Download PDF</span>
                </span>
              </a>
            </li>
          </ul>
        </FadeIn>

        <FadeIn className="card contact-form-card" delay={0.1}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" maxLength={100}
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={200}
                  value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">Subject <span className="optional">(optional)</span></label>
              <input id="subject" name="subject" type="text" maxLength={200}
                value={form.subject} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} maxLength={5000}
                value={form.message} onChange={handleChange} required />
            </div>

            {/* Honeypot for bots: hidden from people and screen readers. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
                value={form.website} onChange={handleChange} />
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
              </button>
              <p
                className={`form-status ${status.state}`}
                role={status.state === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {status.message}
              </p>
            </div>
          </form>
        </FadeIn>
      </div>
    </div>
  );
};

export default ContactPage;
