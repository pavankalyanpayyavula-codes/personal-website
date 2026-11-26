import nodemailer from 'nodemailer';

// Emails each contact form submission (name, email, subject, message) to you.
//
// Vercel environment variables:
//   EMAIL_USER – your Gmail address (sends and receives the mail)
//   EMAIL_PASS – a Gmail App Password: https://myaccount.google.com/apppasswords
//   RECIPIENT_EMAIL – optional; defaults to EMAIL_USER with a "+portfolio" alias

/** The slice of Vercel's request this handler uses. Body is JSON, or a raw string in local dev. */
export interface ApiRequest {
  method?: string;
  body?: unknown;
}

/** The slice of Vercel's response this handler uses (also mimicked by dev/localApi.ts). */
export interface ApiResponse {
  status(code: number): ApiResponse;
  setHeader(name: string, value: string): ApiResponse;
  json(data: { message: string }): void;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Strip line breaks so user input can never inject extra mail headers.
const oneLine = (value: unknown): string =>
  String(value)
    .replace(/[\r\n]+/g, ' ')
    .trim();

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const body: ContactPayload =
    typeof req.body === 'string' ? safeParse(req.body) : ((req.body as ContactPayload) ?? {});

  // Honeypot: a hidden field only bots fill in. Pretend success and drop it.
  if (body.website) {
    res.status(200).json({ message: 'Message sent' });
    return;
  }

  const name = oneLine(body.name ?? '');
  const email = oneLine(body.email ?? '');
  const subject = oneLine(body.subject ?? '');
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    res.status(400).json({ message: 'Name, email and message are required.' });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ message: 'Please enter a valid email address.' });
    return;
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    res.status(400).json({ message: 'Your message is too long.' });
    return;
  }

  const user = (process.env.EMAIL_USER || '').trim();
  // Google shows App Passwords as "abcd efgh ijkl mnop"; the spaces aren't part of it.
  const pass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  if (!user || !pass) {
    console.error('EMAIL_USER / EMAIL_PASS are not configured');
    res.status(500).json({ message: 'Email is not configured on the server.' });
    return;
  }

  // Gmail files mail sent to your own address under "Sent", not the Inbox.
  // A "+portfolio" alias reaches the same inbox but shows up as new mail.
  const to = (process.env.RECIPIENT_EMAIL || '').trim() || user.replace('@', '+portfolio@');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    const info = await transporter.sendMail({
      from: `Portfolio contact form <${user}>`,
      to,
      replyTo: `${name} <${email}>`, // hitting Reply answers the visitor
      subject: subject ? `${subject} (from ${name})` : `New message from ${name}`,
      // Body is just the visitor's message. Their name is in the subject line
      // and in the sender shown on Reply; their email is the Reply-To.
      text: message,
      html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    console.log(`Contact email sent to ${to} (${info.messageId})`);
    res.status(200).json({ message: 'Message sent' });
    return;
  } catch (error) {
    // EAUTH = Gmail rejected EMAIL_USER/EMAIL_PASS; ETIMEDOUT/ECONNECTION = network blocked.
    const {
      code = '',
      response,
      message: reason,
    } = error as { code?: string; response?: string; message?: string };
    console.error('Error sending email:', code, response ?? reason);
    res.status(500).json({ message: 'Could not send the message.' });
    return;
  }
}

function safeParse(text: string): ContactPayload {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
