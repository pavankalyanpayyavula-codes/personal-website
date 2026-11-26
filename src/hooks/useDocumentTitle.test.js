import { renderHook } from '@testing-library/react';
import useDocumentTitle from './useDocumentTitle';

describe('useDocumentTitle', () => {
  it('uses the full site title when no page name is given', () => {
    renderHook(() => useDocumentTitle());
    expect(document.title).toBe('Pavan Kalyan Payyavula · Senior Frontend Engineer');
  });

  it('prefixes the page name', () => {
    renderHook(() => useDocumentTitle('Career'));
    expect(document.title).toBe('Career · Pavan Kalyan Payyavula');
  });

  it('updates when the page name changes', () => {
    const { rerender } = renderHook(({ page }) => useDocumentTitle(page), { initialProps: { page: 'About' } });
    expect(document.title).toBe('About · Pavan Kalyan Payyavula');
    rerender({ page: 'Contact' });
    expect(document.title).toBe('Contact · Pavan Kalyan Payyavula');
  });
});
