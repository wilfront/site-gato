import { Readable } from 'stream';
import { cloudinary } from '@/lib/cloudinary';
import supabase from '@/lib/supabase';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    const tipo = data.get('tipo');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'Arquivo inválido' }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'meu-site',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(buffer).pipe(stream);
      });

    const result = await streamUpload();

    // Salva URL e tipo no Supabase
    const { data: insertedData, error } = await supabase
      .from('midias')
      .insert([{ url: result.secure_url, tipo }])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(insertedData), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro no servidor' }), { status: 500 });
  }
}
