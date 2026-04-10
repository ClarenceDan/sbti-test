'use client';

import { useEffect, useState } from 'react';
import { PRIMARY_SITE_HOST } from '@/data/brand';

const fallbackSite = {
  host: PRIMARY_SITE_HOST,
  origin: `https://${PRIMARY_SITE_HOST}`,
};

function getBrowserSite() {
  if (typeof window === 'undefined') {
    return fallbackSite;
  }

  return {
    host: window.location.host || PRIMARY_SITE_HOST,
    origin: window.location.origin || `https://${PRIMARY_SITE_HOST}`,
  };
}

export function useRuntimeSite() {
  const [site, setSite] = useState(fallbackSite);

  useEffect(() => {
    setSite(getBrowserSite());
  }, []);

  return site;
}
