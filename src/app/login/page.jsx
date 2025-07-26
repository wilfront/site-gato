'use client';
import './login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    async function handleLogin() {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ usuario, senha }),
        });

        if (res.ok) {
            router.push('/admin/dashboard');
        } else {
            alert('Login inválido');
        }
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <input value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuário" />
            <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Senha" />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}
