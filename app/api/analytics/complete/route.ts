import { recordCompletion } from '@/lib/analytics';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { typeCode?: string; dna?: string } | null;

  if (!body?.typeCode || !body?.dna) {
    return Response.json({ ok: false }, { status: 400 });
  }

  await recordCompletion(body.typeCode, body.dna);
  return Response.json({ ok: true });
}
