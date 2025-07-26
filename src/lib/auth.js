import { promises as fs } from 'fs';
import path from 'path';

const userPath = path.join(process.cwd(), 'src', 'db', 'usuarios.json');

export async function validarLogin(usuario, senha) {
    const data = await fs.readFile(userPath, 'utf-8');
    const usuarios = JSON.parse(data);
    return usuarios.some(u => u.usuario === usuario && u.senha === senha);
}

export async function alterarSenha(usuario, novaSenha) {
    const data = await fs.readFile(userPath, 'utf-8');
    const usuarios = JSON.parse(data);
    const atualizados = usuarios.map(u => (
        u.usuario === usuario ? { ...u, senha: novaSenha } : u
    ));
    await fs.writeFile(userPath, JSON.stringify(atualizados, null, 2));
    return true;
}
