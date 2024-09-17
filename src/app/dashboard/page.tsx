import { ModalView } from '@/components/modal-view'
import Image from 'next/image'
import React from 'react'

export default async function Page() {
  return (
    <main className='text-white px-[10vw] py-[5vh] relative min-h-screen'>
      <Image src={'/wal.jpg'} alt='' fill objectFit='cover' className='z-[-20] maskImg' />
      <ModalView/>
    </main>
  )
}
