'use client'

import React, { useEffect, useState } from 'react'

const frases = [
  "Em construção !",
  "Logo teremos novidades...",
  "Obrigado pela paciência!",
  "Volte em breve :)"
]

export default function TypingEffect() {
  const [texto, setTexto] = useState('')
  const [indiceFrase, setIndiceFrase] = useState(0)
  const [subIndice, setSubIndice] = useState(0)
  const [apagando, setApagando] = useState(false)

  useEffect(() => {
    if (!apagando && subIndice <= frases[indiceFrase].length) {
      setTimeout(() => {
        setTexto(frases[indiceFrase].substring(0, subIndice))
        setSubIndice(subIndice + 1)
      }, 150)
    } else if (apagando && subIndice >= 0) {
      setTimeout(() => {
        setTexto(frases[indiceFrase].substring(0, subIndice))
        setSubIndice(subIndice - 1)
      }, 75)
    } else if (!apagando && subIndice > frases[indiceFrase].length) {
      setTimeout(() => {
        setApagando(true)
      }, 1500)
    } else if (apagando && subIndice < 0) {
      setApagando(false)
      setIndiceFrase((indiceFrase + 1) % frases.length)
      setSubIndice(0)
    }
  }, [subIndice, apagando, indiceFrase])

  return (
    <div className="home">
      <video
        className="video-background"
        src="/videos/fundo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay">
        <h1 className="typing">{texto}<span className="cursor">|</span></h1>
      </div>
    </div>
  )
}
