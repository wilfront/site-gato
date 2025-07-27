'use client';

import { useEffect, useState } from 'react';
import './admin.css'; // Importando o CSS do painel admin

export default function PainelAdmin() {
  const [file, setFile] = useState(null);
  const [tipo, setTipo] = useState('foto');
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(false);

  // Busca as mídias no início
  useEffect(() => {
    fetch('/api/midias')
      .then((res) => res.json())
      .then((data) => {
        setMidias(data || []);
      })
      .catch(() => setMidias([]));
  }, []);

  // Upload
  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert('Selecione um arquivo');

    const form = new FormData();
    form.append('file', file);
    form.append('tipo', tipo);

    setLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro no upload');

      setMidias((prev) => [data, ...prev]);
      setFile(null);
      alert('Upload realizado com sucesso!');
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  // Deletar mídia
  async function handleDelete(id) {
    if (!confirm('Deseja realmente excluir esta mídia?')) return;

    try {
      const res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao deletar');

      setMidias((prev) => prev.filter((m) => m.id !== id));
      alert('Mídia excluída com sucesso!');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="painel-admin" style={{ padding: 20 }}>
      <h1>Painel Admin</h1>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*,video/*"
          disabled={loading}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} disabled={loading}>
          <option value="foto">Foto</option>
          <option value="video">Vídeo</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      <h2>Mídias Enviadas</h2>

      {midias.length === 0 ? (
        <p>Nenhuma mídia enviada</p>
      ) : (
        <div
          className="midias-enviadas"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
        >
          {midias.map((m) => (
            <div
              key={m.id}
              className="midia-item"
              style={{ border: '1px solid #ccc', padding: 10 }}
            >
              {m.tipo === 'foto' ? (
                <img src={m.url} alt="Foto" style={{ width: 150 }} />
              ) : (
                <video src={m.url} controls style={{ width: 150 }} />
              )}
              <button
                onClick={() => handleDelete(m.id)}
                style={{ marginTop: 10, width: '100%' }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
