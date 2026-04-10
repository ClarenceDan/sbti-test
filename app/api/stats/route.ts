import { getSiteStats } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET() {
  const stats = await getSiteStats();
  return Response.json(stats);
}
