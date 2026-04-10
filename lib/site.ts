import { headers } from 'next/headers';
import { PRIMARY_SITE_HOST } from '@/data/brand';

function sanitizeHost(host: string | null | undefined) {
  if (!host) return PRIMARY_SITE_HOST;
  return host.split(',')[0]?.trim().replace(/\/+$/, '') || PRIMARY_SITE_HOST;
}

function isLocalHost(host: string) {
  return host.startsWith('localhost') || host.startsWith('127.0.0.1');
}

export function getBrowserSite() {
  if (typeof window === 'undefined') {
    return {
      host: PRIMARY_SITE_HOST,
      origin: `https://${PRIMARY_SITE_HOST}`,
    };
  }

  return {
    host: window.location.host || PRIMARY_SITE_HOST,
    origin: window.location.origin || `https://${PRIMARY_SITE_HOST}`,
  };
}

export async function getRequestSite() {
  const headerList = await headers();
  const host = sanitizeHost(
    headerList.get('x-forwarded-host') ?? headerList.get('host') ?? PRIMARY_SITE_HOST
  );
  const protocol =
    headerList.get('x-forwarded-proto') ?? (isLocalHost(host) ? 'http' : 'https');

  return {
    host,
    origin: `${protocol}://${host}`,
  };
}
