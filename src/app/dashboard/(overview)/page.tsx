import { ModalView } from '@/components/modal-view'
import Image from 'next/image'
import React from 'react'
import { HeroStory } from './hero'
import { serverSession } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Page() {

  const session = await serverSession();

  if (!session) return redirect('/')

  return (
    <main className='text-white flex flex-col justify-end h-[85%]'>
      <HeroStory/>
    </main>
  )
}
