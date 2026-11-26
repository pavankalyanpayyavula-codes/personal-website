import { useEffect } from 'react';

const SITE_NAME = 'Pavan Kalyan Payyavula';

/** Sets the browser tab title: "<page> · <site>", or the full site title on the home page. */
export default function useDocumentTitle(page?: string): void {
  useEffect(() => {
    document.title = page ? `${page} · ${SITE_NAME}` : `${SITE_NAME} · Senior Frontend Engineer`;
  }, [page]);
}
