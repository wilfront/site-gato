export const dynamic = 'force-dynamic'; // desativa cache estático e ISR no Next.js

import { createClient } from '@supabase/supabase-js';
import FotosClient from './FotosClient';
import './fotos.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getFotos() {
  const { data, error } = await supabase
    .from('midias')
    .select('*')
    .eq('tipo', 'foto')
    .order('id', { ascending: false });

  if (error) {
    console.error('Erro ao buscar fotos:', error.message);
    return [];
  }

  return data || [];
}

export default async function FotosPage() {
  const fotos = await getFotos();

  return (
    <div className="fotos-page">
      <h1>Fotos</h1>
      <FotosClient fotos={fotos} />
    </div>
  );
}
