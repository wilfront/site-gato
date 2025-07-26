export async function GET(req) {
    const logado = req.cookies.get('logado')?.value;
    return logado === 'true'
        ? Response.json({ ok: true })
        : Response.json({ error: 'Não autorizado' }, { status: 401 });
}
