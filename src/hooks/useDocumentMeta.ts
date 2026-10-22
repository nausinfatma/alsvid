import { useEffect } from 'react';
import { site } from '../data/site';

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === site.name ? title : `${title} | ${site.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
