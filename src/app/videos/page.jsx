// app/videos/page.js
import supabase from '@/lib/supabase';
import './videos.css'; // CSS exclusivo para vídeos

export default async function VideosPage() {
  const { data: videos, error } = await supabase
    .from('midias')
    .select('*')
    .eq('tipo', 'video')
    .order('id', { ascending: false });

  if (error) {
    console.error('Erro ao buscar vídeos:', error);
    return <p>Erro ao carregar vídeos.</p>;
  }

  return (
    <div className="videos-page">
      <h1>Vídeos</h1>
      <div className="videos-grid">
        {videos.map((video, i) => (
          <div className="video-item" key={i}>
            <video src={video.url} controls />
          </div>
        ))}
      </div>
    </div>
  );
}
