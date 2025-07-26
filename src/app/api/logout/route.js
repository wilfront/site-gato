import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ ok: true });

    // Remove o cookie "logado"
    res.cookies.set('logado', '', { maxAge: 0, path: '/' });

    return res;
}
