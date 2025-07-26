import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'db', 'midias.json');

export async function DELETE(req) {
    const { url } = await req.json();
    const data = await fs.readFile(filePath, 'utf-8');
    const midias = JSON.parse(data);
    const atualizadas = midias.filter(m => m.url !== url);
    await fs.writeFile(filePath, JSON.stringify(atualizadas, null, 2));
    return Response.json({ success: true });
}
