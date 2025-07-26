'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tipo, setTipo] = useState('foto');
  const [midias, setMidias] = useState([]);
  const router = useRouter();

  // Verifica login
  useEffect(() => {
    fetch('/api/verifica-auth').then(res => {
      if (!res.ok) router.push('/login');
    });

    fetch('/api/midias').then(res => res.json()).then(setMidias);
  }, []);

  // Função para redimensionar imagem (apenas fotos)
  function resizeImage(file, maxWidth = 1000, maxHeight = 1000) {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type,
          0.8 // qualidade 80%
        );
      };

      reader.readAsDataURL(file);
    });
  }

  // Mostra preview da imagem/vídeo
  function handleFile(e) {
    const arquivo = e.target.files[0];
    setFile(arquivo);
    setPreview(URL.createObjectURL(arquivo));
  }

  // Faz upload (com redimensionamento para fotos)
  async function upload() {
    if (!file) return alert('Selecione um arquivo.');

    let uploadFile = file;

    if (tipo === 'foto') {
      try {
        uploadFile = await resizeImage(file);
      } catch (error) {
        alert('Erro ao redimensionar a imagem.');
        return;
      }
    }

    const form = new FormData();
    form.append('file', uploadFile, file.name);
    form.append('tipo', tipo);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });

    if (!res.ok) {
      alert('Erro no upload');
      return;
    }

    const json = await res.json();
    setMidias(m => [...m, json.midia]);
    setFile(null);
    setPreview(null);
  }

  // Deletar imagem
  async function deletar(url) {
    await fetch('/api/delete', {
      method: 'DELETE',
      body: JSON.stringify({ url }),
    });

    setMidias(m => m.filter(m => m.url !== url));
  }

  // Logout
  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <div className='painel-admin' style={{ padding: 20 }}>
      <h2>Painel Admin</h2>
      <button onClick={logout}>Sair</button>

      <hr />

      <h3>Enviar nova mídia</h3>
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="foto">Foto</option>
        <option value="video">Vídeo</option>
      </select>

      <input type="file" onChange={handleFile} accept={tipo === 'foto' ? 'image/*' : 'video/*'} />

      {preview && (
        <div style={{ margin: '10px 0' }}>
          {tipo === 'foto'
            ? <img src={preview} width={200} />
            : <video src={preview} width={300} controls />}
        </div>
      )}

      <button onClick={upload}>Enviar</button>

      <hr />

      <h3>Mídias enviadas</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {midias.map((m, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: 10 }}>
            {m.tipo === 'foto' ? (
              <img src={m.url} width={200} />
            ) : (
              <video src={m.url} width={300} controls />
            )}
            <button onClick={() => deletar(m.url)} style={{ marginTop: 5 }}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}
