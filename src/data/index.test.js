import fs from 'node:fs';
import path from 'node:path';
import { navigation, home, career, contact, blogs, careerStartYear } from './index';

// Guards the content file against typos that would break pages silently.
describe('site data', () => {
  it('has a navigation entry for every page route', () => {
    expect(navigation.map((n) => n.path)).toEqual(['/about', '/career', '/blogs', '/contact']);
    for (const link of navigation) expect(link.name).toBeTruthy();
  });

  it('has a sensible career start year', () => {
    expect(careerStartYear).toBeGreaterThanOrEqual(2015);
    expect(careerStartYear).toBeLessThanOrEqual(new Date().getFullYear());
  });

  it('has complete About page content', () => {
    expect(home.profileImage).toBeTruthy();
    for (const group of home.skills) {
      expect(group.title).toBeTruthy();
      expect(group.description).toBeTruthy();
      expect(group.skills.length).toBeGreaterThan(0);
    }
    for (const edu of home.education) {
      expect(edu.degree && edu.school && edu.year).toBeTruthy();
    }
    expect(home.interests.length).toBeGreaterThan(0);
  });

  it('has complete experience entries with unique keys', () => {
    const keys = career.experiences.map((e) => `${e.company}-${e.period}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const exp of career.experiences) {
      expect(exp.title && exp.company && exp.period && exp.location && exp.description).toBeTruthy();
      expect(exp.achievements.length).toBeGreaterThan(0);
      expect(exp.skills.length).toBeGreaterThan(0);
    }
  });

  it('has unique award and certification titles', () => {
    const awards = career.awards.map((a) => a.title);
    const certs = career.certifications.map((c) => c.name);
    expect(new Set(awards).size).toBe(awards.length);
    expect(new Set(certs).size).toBe(certs.length);
  });

  it('has valid contact details', () => {
    expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    for (const s of contact.socials) {
      expect(s.url).toMatch(/^https:\/\//);
      expect(['linkedin', 'github']).toContain(s.icon);
    }
  });

  it('points the resume link at a file that exists in public/', () => {
    expect(contact.resume.url).toMatch(/^\/.+\.pdf$/);
    expect(contact.resume.fileName).toMatch(/\.pdf$/);
    const file = path.resolve(process.cwd(), 'public', contact.resume.url.slice(1));
    expect(fs.existsSync(file)).toBe(true);
  });

  it('has blog posts whose categories all exist', () => {
    const ids = blogs.categories.map((c) => c.id);
    expect(ids).toContain('all');
    const postIds = blogs.posts.map((p) => p.id);
    expect(new Set(postIds).size).toBe(postIds.length);
    for (const post of blogs.posts) {
      expect(ids).toContain(post.category);
      expect(post.title && post.excerpt).toBeTruthy();
    }
  });
});
