import { ModalView } from '@/components/modal-view'
import Image from 'next/image'
import React from 'react'
import { HeroStory } from './hero'

export default async function Page() {
  return (
    <main className='text-white flex flex-col justify-end h-[85%]'>
      <HeroStory/>
    </main>
  )
}
