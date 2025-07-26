import { promises as fs } from 'fs';
import path from 'path';
import FotosClient from './FotosClient';
import './fotos.css';

async function getFotos() {
  const filePath = path.join(process.cwd(), 'src', 'db', 'midias.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const midias = JSON.parse(data);
  return midias.filter((m) => m.tipo === 'foto');
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
