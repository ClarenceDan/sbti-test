import { buildCpReport } from '@/data/cp';
import { extractDnaInput } from '@/data/dna';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    a?: string;
    b?: string;
  } | null;

  const encodedA = body?.a ? extractDnaInput(body.a) : null;
  const encodedB = body?.b ? extractDnaInput(body.b) : null;

  if (!encodedA || !encodedB) {
    return Response.json({ error: 'invalid' }, { status: 400 });
  }

  try {
    const payload = buildCpReport(encodedA, encodedB);
    return Response.json({
      ...payload,
      encodedA,
      encodedB,
    });
  } catch {
    return Response.json({ error: 'invalid' }, { status: 400 });
  }
}
