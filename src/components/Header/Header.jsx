'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Header.css'
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <header className='header'>
      <a className='logo' href="/"><img src="/mandala.png" alt="logo" width='50px' /></a>

      {/* Botão hamburguer SÓ aparece no mobile quando o menu está fechado */}
      {!open && (
        <div className='menu-toggle' onClick={toggle}>
          <span className='hamburger'>&#9776;</span>
        </div>
      )}

      {/* Menu fixo (desktop) */}
      <nav className='menu-desktop'>
        <ul className='menu-list'>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/fotos'>Fotos</Link></li>
          <li><Link href='/videos'>Vídeos</Link></li>
        </ul>
      </nav>

      {/* Menu lateral com botão de close interno */}
      <AnimatePresence>
        {open && (
          <motion.div
            className='menu-mobile'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4 }}
          >
            {/* Botão de fechar DENTRO do menu */}
            <div className='close-btn-container'>
              <span className='close-btn' onClick={toggle}>&times;</span>
            </div>

            <ul className='menu-list'>
              <li><Link href='/' onClick={toggle}>Home</Link></li>
              <li><Link href='/fotos' onClick={toggle}>Fotos</Link></li>
              <li><Link href='/videos' onClick={toggle}>Vídeos</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
