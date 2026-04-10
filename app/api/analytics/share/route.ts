import { recordShare } from '@/lib/analytics';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    channel?: string;
    typeCode?: string;
  } | null;

  if (!body?.channel) {
    return Response.json({ ok: false }, { status: 400 });
  }

  await recordShare(body.channel, body.typeCode);
  return Response.json({ ok: true });
}
