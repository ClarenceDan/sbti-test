import { recordCpReport } from '@/lib/analytics';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    typeCodeA?: string;
    typeCodeB?: string;
    score?: number;
  } | null;

  if (!body?.typeCodeA || !body?.typeCodeB || typeof body.score !== 'number') {
    return Response.json({ ok: false }, { status: 400 });
  }

  await recordCpReport(body.typeCodeA, body.typeCodeB, body.score);
  return Response.json({ ok: true });
}
