import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

export function Navigation() {
  <nav>

  </nav>
}

export default function Header() {
  return (
    <header className='w-screen p-5 md:px-[5%] bg-transparent text-white flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className='h-[30px] w-[30px] md:h-[50px] md:w-[50px] relative'>
          <Image src={'/logo.svg'} alt='logo' fill objectFit='cover' />
        </div>
        <h1 className='text-xl md:text-3xl font-black text-primary font-["var(--font-joti_One)"]'>Jujuba</h1>
      </div>
      <div>
        <Button 
          variant={'outline'} 
          className='rounded-2xl text-primary border-primary hover:opacity-80 hover:bg-transparent'>
          Começar
        </Button>
      </div>
    </header>
  )
}
