import nodemailer from 'nodemailer';

// Emails each contact form submission (name, email, subject, message) to you.
//
// Vercel environment variables:
//   EMAIL_USER – your Gmail address (sends and receives the mail)
//   EMAIL_PASS – a Gmail App Password: https://myaccount.google.com/apppasswords

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Strip line breaks so user input can never inject extra mail headers.
const oneLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  // Honeypot: a hidden field only bots fill in. Pretend success and drop it.
  if (body.website) {
    return res.status(200).json({ message: 'Message sent' });
  }

  const name = oneLine(body.name ?? '');
  const email = oneLine(body.email ?? '');
  const subject = oneLine(body.subject ?? '');
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({ message: 'Your message is too long.' });
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
      from: `Portfolio contact form <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `${name} <${email}>`, // hitting Reply answers the visitor
      subject: subject ? `${subject} (from ${name})` : `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '-'}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || '-')}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
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
