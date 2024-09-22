import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import ButtonAuthCTA from './button-client'

export default function HeroSection() {
  return (
    <div>
      <Image 
        src={'/bg1.jpeg'}
        alt='Background da imagem do livro Sulwe'
        fill
        className='object-cover z-[-10] maskImg scale-x-[-1]'
      />
      <div className='container px-[10vw] py-[10vh] md:w-[60vw]'>
        <div className='space-y-14'>
          <h1 className='text-3xl md:text-5xl text-primary font-bold font-["var(--font-joti_One)"]'>
            Crie histórias onde sua criança encontra seu próprio reflexo e inspiração.
          </h1>
          <p className='text-lg md:text-2xl font-extralight text-white'>
            Crie histórias divertidas e personalizadas que trazem vida às aventuras da sua criança e ajudam a construir uma imagem positiva e inspiradora. É rápido e fácil, e vai encantar qualquer criança.
          </p>
        </div>
        <ButtonAuthCTA/>
      </div>
    </div>
  )
}
