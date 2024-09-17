import { CarouselBox } from '@/components/carousel-section'
import { ModalView } from '@/components/modal-view'
import Image from 'next/image'
import React from 'react'

export function HeroStory() {
  return (
    <>
      <section className='text-white px-[10vw] -z-10 py-[10vh] flex flex-col h-[90%]  absolute top-0 left-0 w-full'>
        <Image 
          src={'/wal.jpg'} 
          alt='' 
          fill 
          className='-z-50 object-cover mask-linear mask-dir-to-b mask-from-[1] mask-point-to-[100%]' 
        />
      </section>
      <div className='flex flex-col px-[5%]'>
        <CarouselBox/>
      </div>
    </>
  )
}
