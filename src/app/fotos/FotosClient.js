'use client';

import { useState } from 'react';

export default function FotosClient({ fotos }) {
    const [selectedFoto, setSelectedFoto] = useState(null);

    return (
        <>
            <div className="fotos-grid">
                {fotos.map((foto, i) => (
                    <div className="foto-item" key={i}>
                        <img
                            src={foto.url}
                            alt={`Foto ${i}`}
                            onClick={() => setSelectedFoto(foto.url)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                ))}
            </div>

            {selectedFoto && (
                <div className="modal" onClick={() => setSelectedFoto(null)}>
                    <img src={selectedFoto} alt="Foto ampliada" className="modal-img" />
                </div>
            )}
        </>
    );
}
