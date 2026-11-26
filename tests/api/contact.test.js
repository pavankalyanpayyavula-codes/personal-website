// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const sendMail = vi.fn();
const createTransport = vi.fn(() => ({ sendMail }));
vi.mock('nodemailer', () => ({ default: { createTransport } }));

const { default: handler } = await import('../../api/contact.js');

// Minimal stand-in for Vercel's response object.
function mockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader: vi.fn((k, v) => { res.headers[k] = v; return res; }),
    status: vi.fn((code) => { res.statusCode = code; return res; }),
    json: vi.fn((data) => { res.body = data; return res; }),
  };
  return res;
}

async function call(body, method = 'POST') {
  const res = mockRes();
  await handler({ method, body }, res);
  return res;
}

const valid = { name: 'Asha Rao', email: 'asha@example.com', subject: 'Hello', message: 'Hi there!' };

describe('api/contact', () => {
  beforeEach(() => {
    process.env.EMAIL_USER = 'owner@gmail.com';
    process.env.EMAIL_PASS = 'abcd efgh ijkl mnop';
    delete process.env.RECIPIENT_EMAIL;
    sendMail.mockReset().mockResolvedValue({ messageId: '<id@test>' });
    createTransport.mockClear();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it('rejects non-POST requests with 405 and an Allow header', async () => {
    const res = await call(undefined, 'GET');
    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe('POST');
    expect(sendMail).not.toHaveBeenCalled();
  });

  it.each([
    ['name', { ...valid, name: '' }],
    ['email', { ...valid, email: '   ' }],
    ['message', { ...valid, message: '' }],
  ])('requires %s', async (_field, body) => {
    const res = await call(body);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    const res = await call({ ...valid, email: 'not-an-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/valid email/i);
  });

  it.each([
    ['name', 101],
    ['email', 201],
    ['subject', 201],
    ['message', 5001],
  ])('rejects a %s longer than the limit', async (field, length) => {
    const value = field === 'email' ? `${'a'.repeat(length - '@ex.com'.length)}@ex.com` : 'a'.repeat(length);
    const res = await call({ ...valid, [field]: value });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/too long/i);
  });

  it('silently accepts honeypot submissions without sending mail', async () => {
    const res = await call({ ...valid, website: 'http://spam.example' });
    expect(res.statusCode).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 500 when email credentials are missing', async () => {
    delete process.env.EMAIL_PASS;
    const res = await call(valid);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/not configured/i);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('logs in to Gmail with the App Password spaces removed', async () => {
    await call(valid);
    expect(createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: { user: 'owner@gmail.com', pass: 'abcdefghijklmnop' },
    });
  });

  it('sends only the message in the body, to the +portfolio alias', async () => {
    const res = await call(valid);
    expect(res.statusCode).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);

    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe('owner+portfolio@gmail.com');
    expect(mail.from).toBe('Portfolio contact form <owner@gmail.com>');
    expect(mail.replyTo).toBe('Asha Rao <asha@example.com>');
    expect(mail.subject).toBe('Hello (from Asha Rao)');
    expect(mail.text).toBe('Hi there!');
    expect(mail.html).not.toMatch(/Name:|Email:|Subject:/);
  });

  it('uses a default subject line when the subject is blank', async () => {
    await call({ ...valid, subject: '' });
    expect(sendMail.mock.calls[0][0].subject).toBe('New message from Asha Rao');
  });

  it('sends to RECIPIENT_EMAIL when it is set', async () => {
    process.env.RECIPIENT_EMAIL = 'inbox@example.com';
    await call(valid);
    expect(sendMail.mock.calls[0][0].to).toBe('inbox@example.com');
  });

  it('escapes HTML in the message', async () => {
    await call({ ...valid, message: '<script>alert("x")</script>' });
    const { html } = sendMail.mock.calls[0][0];
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });

  it('strips line breaks from header fields to block header injection', async () => {
    await call({ ...valid, name: 'Eve\r\nBcc: victim@example.com', subject: 'Hi\nBcc: x@y.z' });
    const mail = sendMail.mock.calls[0][0];
    expect(mail.replyTo).not.toMatch(/[\r\n]/);
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });

  it('accepts a JSON string body (as sent by the local dev server)', async () => {
    const res = await call(JSON.stringify(valid));
    expect(res.statusCode).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('treats an unparseable string body as empty', async () => {
    const res = await call('{not json');
    expect(res.statusCode).toBe(400);
  });

  it('returns 500 when Gmail fails to send', async () => {
    sendMail.mockRejectedValue(Object.assign(new Error('bad login'), { code: 'EAUTH' }));
    const res = await call(valid);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/could not send/i);
  });
});
