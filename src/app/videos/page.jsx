// app/videos/page.js
import { promises as fs } from 'fs';
import path from 'path';
import './videos.css'; // CSS exclusivo para vídeos

async function getVideos() {
  const filePath = path.join(process.cwd(), 'src', 'db', 'midias.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const midias = JSON.parse(data);
  return midias.filter((m) => m.tipo === 'video');
}

export default async function VideosPage() {
  const videos = await getVideos();

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
