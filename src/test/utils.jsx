import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

// Render a page at a route, optionally inside the real site Layout.
export function renderAt(ui, { route = '/', withLayout = false } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        {withLayout ? (
          <Route element={<Layout />}>
            <Route path="*" element={ui} />
          </Route>
        ) : (
          <Route path="*" element={ui} />
        )}
      </Routes>
    </MemoryRouter>,
  );
}
