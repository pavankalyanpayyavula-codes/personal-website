import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';

interface RenderAtOptions {
  route?: string;
  withLayout?: boolean;
}

/** Renders a page at a route, optionally inside the real site Layout. */
export function renderAt(
  ui: ReactElement,
  { route = '/', withLayout = false }: RenderAtOptions = {},
) {
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

/** Returns the element or fails the test with a clear message, instead of a null-check crash. */
export function getByClass(className: string, container: ParentNode = document): HTMLElement {
  const element = container.querySelector<HTMLElement>(`.${className}`);
  if (!element) throw new Error(`No element with class "${className}"`);
  return element;
}
