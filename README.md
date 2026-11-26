# Pavan Kalyan Payyavula · personal website

My portfolio site: about, career history, writing and a contact form.

Built with React 18, Vite, React Router and Framer Motion. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # site only, http://localhost:5173
```

The contact form posts to a Vercel serverless function (`api/contact.js`). To run the
site and the function together, use the Vercel CLI:

```bash
npx vercel dev
```

## Editing content

All text lives in [`src/data/index.js`](src/data/index.js): skills, experience, awards,
certifications, blog posts and contact links. Pages read from there, so most updates
don't touch any component code.

## Contact form setup (Vercel)

Set these environment variables in the Vercel project settings:

| Variable | Value |
| --- | --- |
| `EMAIL_USER` | Gmail address that sends the mail |
| `EMAIL_PASS` | A Gmail [App Password](https://myaccount.google.com/apppasswords) (needs 2-step verification) |
| `RECIPIENT_EMAIL` | Optional. Where messages go; defaults to `EMAIL_USER` |

## Project layout

```
api/contact.js       serverless function that emails form submissions
public/              favicon and link-preview image
src/data/index.js    all site content
src/components/      layout, navbar, footer, shared bits
src/pages/           one file per route
src/styles/          one stylesheet per page; tokens live in src/index.css
```
