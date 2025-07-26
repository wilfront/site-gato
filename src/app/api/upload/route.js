import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'db', 'midias.json');

function streamUpload(buffer, options) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );

        stream.end(buffer);
    });
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const tipo = formData.get('tipo'); // "foto" ou "video"

        if (!file || !tipo) {
            return NextResponse.json({ error: 'Arquivo ou tipo faltando' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Faz upload direto do buffer para o Cloudinary
        const result = await streamUpload(buffer, {
            resource_type: 'auto',
            folder: 'painel',
        });

        // Ler arquivo JSON existente (cria vazio se não existir)
        let midias = [];
        try {
            const fileData = await fs.readFile(filePath, 'utf-8');
            if (fileData) midias = JSON.parse(fileData);
        } catch {
            // arquivo não existe, ignora
        }

        // Nova entrada
        const novaMidia = {
            url: result.secure_url,
            tipo,
            data: new Date().toISOString(),
        };

        midias.push(novaMidia);

        await fs.writeFile(filePath, JSON.stringify(midias, null, 2));

        return NextResponse.json({ success: true, midia: novaMidia });
    } catch (err) {
        return NextResponse.json({ error: 'Erro no upload', details: err.message }, { status: 500 });
    }
}
