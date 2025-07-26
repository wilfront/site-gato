import { NextResponse } from 'next/server';
import { validarLogin } from '@/lib/auth';

export async function POST(req) {
    const { usuario, senha } = await req.json();
    const valido = await validarLogin(usuario, senha);

    if (valido) {
        const resposta = NextResponse.json({ success: true });
        resposta.cookies.set('logado', 'true', { path: '/' });
        return resposta;
    }

    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
}
