import nodemailer from 'nodemailer';

// Required Vercel environment variables:
//   EMAIL_USER  – Gmail address that sends the mail
//   EMAIL_PASS  – Gmail App Password (not your normal password)
// Optional:
//   RECIPIENT_EMAIL – where messages are delivered (defaults to EMAIL_USER)

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Strip CR/LF so user input can never inject extra mail headers.
const oneLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { name = '', email = '', subject = '', message = '', website = '' } = body;

  // Honeypot: real visitors never see or fill this field.
  if (website) {
    return res.status(200).json({ message: 'Message sent' });
  }

  const clean = {
    name: oneLine(name),
    email: oneLine(email),
    subject: oneLine(subject),
    message: String(message).trim(),
  };

  if (!clean.name || !clean.email || !clean.message) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }
  if (!EMAIL_RE.test(clean.email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  for (const [field, max] of Object.entries(LIMITS)) {
    if (clean[field].length > max) {
      return res.status(400).json({ message: `${field} is too long.` });
    }
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER / EMAIL_PASS are not configured');
    return res.status(500).json({ message: 'Email is not configured on the server.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      replyTo: clean.email,
      subject: `Portfolio contact: ${clean.subject || 'New message'}`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}\nSubject: ${clean.subject}\n\n${clean.message}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(clean.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(clean.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(clean.subject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(clean.message)}</p>
      `,
    });
    return res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Could not send the message.' });
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
