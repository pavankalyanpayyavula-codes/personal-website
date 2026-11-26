import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from './ContactPage';
import { contact } from '../data';
import { renderAt } from '../test/utils';

const okResponse = () => ({ ok: true, json: async () => ({ message: 'Message sent' }) });

async function fillForm(user, { name = 'Asha', email = 'asha@example.com', subject = '', message = 'Hello!' } = {}) {
  if (name) await user.type(screen.getByLabelText('Name'), name);
  if (email) await user.type(screen.getByLabelText('Email'), email);
  if (subject) await user.type(screen.getByLabelText(/subject/i), subject);
  if (message) await user.type(screen.getByLabelText('Message'), message);
}

describe('ContactPage', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    delete globalThis.fetch;
  });

  it('sets the page title and shows direct contact options', () => {
    renderAt(<ContactPage />, { route: '/contact' });
    expect(document.title).toBe('Contact · Pavan Kalyan Payyavula');
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', `mailto:${contact.email}`);
    for (const s of contact.socials) {
      expect(screen.getByRole('link', { name: new RegExp(s.name, 'i') })).toHaveAttribute('href', s.url);
    }
    expect(screen.getByRole('link', { name: /résumé/i })).toHaveAttribute('download', contact.resume.fileName);
  });

  it('has name, email, optional subject and message fields', () => {
    renderAt(<ContactPage />);
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText(/subject/i)).not.toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('asks for the required fields before sending', async () => {
    const user = userEvent.setup();
    renderAt(<ContactPage />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/fill in your name, email and message/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    const user = userEvent.setup();
    renderAt(<ContactPage />);
    await fillForm(user, { email: 'not-an-email' });
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('posts the form to /api/contact and clears it on success', async () => {
    fetch.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    renderAt(<ContactPage />);
    await fillForm(user, { subject: 'Hi' });
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
    const sent = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sent).toEqual({ name: 'Asha', email: 'asha@example.com', subject: 'Hi', message: 'Hello!', website: '' });

    expect(await screen.findByText(/your message is on its way/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });

  it('hides the success message after 3 seconds', async () => {
    // Fake the clock before the timer starts; let userEvent's own delays tick it.
    vi.useFakeTimers({ shouldAdvanceTime: true });
    fetch.mockResolvedValue(okResponse());
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderAt(<ContactPage />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/your message is on its way/i)).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2900));
    expect(screen.getByText(/your message is on its way/i)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByText(/your message is on its way/i)).not.toBeInTheDocument();
  });

  it('disables the button while sending', async () => {
    let resolve;
    fetch.mockReturnValue(new Promise((r) => { resolve = r; }));
    const user = userEvent.setup();
    renderAt(<ContactPage />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    await act(async () => resolve(okResponse()));
    expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
  });

  it('shows the email fallback when the server rejects the message', async () => {
    fetch.mockResolvedValue({ ok: false, json: async () => ({ message: 'Email is not configured' }) });
    const user = userEvent.setup();
    renderAt(<ContactPage />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/didn't go through/i);
    expect(alert).toHaveTextContent(contact.email);
    expect(screen.getByLabelText('Name')).toHaveValue('Asha');
  });

  it('shows the email fallback when the network request fails', async () => {
    fetch.mockRejectedValue(new TypeError('Failed to fetch'));
    const user = userEvent.setup();
    renderAt(<ContactPage />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/didn't go through/i);
  });

  it('includes the hidden honeypot field in the payload', async () => {
    fetch.mockResolvedValue(okResponse());
    const user = userEvent.setup();
    const { container } = renderAt(<ContactPage />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot.closest('.hp')).toHaveAttribute('aria-hidden', 'true');

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toHaveProperty('website', '');
  });
});
