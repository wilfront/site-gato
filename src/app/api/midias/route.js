import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'db', 'midias.json');

export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const midias = JSON.parse(data);
        return Response.json(midias);
    } catch (err) {
        return Response.json({ error: 'Erro ao ler midias.json' }, { status: 500 });
    }
}
