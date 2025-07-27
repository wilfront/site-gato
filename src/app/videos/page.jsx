export const dynamic = 'force-dynamic'; // desativa cache estático

import { createClient } from '@supabase/supabase-js';
import './videos.css';
import VideosClient from './VideosClient'; // componente cliente que você vai criar

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getVideos() {
  const { data, error } = await supabase
    .from('midias')
    .select('*')
    .eq('tipo', 'video')
    .order('id', { ascending: false });

  if (error) {
    console.error('Erro ao buscar vídeos:', error.message);
    return [];
  }

  return data || [];
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="videos-page">
      <h1>Vídeos</h1>
      <VideosClient videos={videos} />
    </div>
  );
}
