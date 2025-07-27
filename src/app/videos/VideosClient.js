'use client';

export default function VideosClient({ videos }) {
    return (
        <div className="fotos-grid">
            {videos.map((video, i) => (
                <div className="foto-item" key={i}>
                    <video
                        src={video.url}
                        controls
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                </div>
            ))}
        </div>
    );
}
