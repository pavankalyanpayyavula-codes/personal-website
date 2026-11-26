import { useEffect } from 'react';

const SITE = 'Pavan Kalyan Payyavula';

export default function useDocumentTitle(page) {
  useEffect(() => {
    document.title = page ? `${page} · ${SITE}` : `${SITE} · Senior Frontend Engineer`;
  }, [page]);
}
