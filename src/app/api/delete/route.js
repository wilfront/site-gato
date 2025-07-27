import supabase from '@/lib/supabase';

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID obrigatório' }), { status: 400 });
    }

    const { error } = await supabase.from('midias').delete().eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro interno' }), { status: 500 });
  }
}
