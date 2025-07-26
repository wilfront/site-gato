import { alterarSenha } from '@/lib/auth';

export async function POST(req) {
    const { usuario, novaSenha } = await req.json();
    await alterarSenha(usuario, novaSenha);
    return Response.json({ ok: true });
}
