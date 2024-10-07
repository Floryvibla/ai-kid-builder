import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Page() {
  return (
    <main className='text-white'>
      <div className='flex w-full h-[140px] md:h-[400px] relative'>
        <div className=' flex-1 flex flex-col justify-center'>
          <div className='px-5 md:px-20 gap-3 md:gap-6 absolute flex flex-col justify-center'>
            <h1 className='text-xl md:text-5xl'>Rebel Ridge Ridge Ridge</h1>
            <Button asChild className='px-5 w-[120px] md:w-[220px] md:text-2xl'> 
              <Link href={'#'}>ASSISTIR</Link>
            </Button>
          </div>
        </div>
        <div className='relative w-[50%] flex-[3]'>
          <Image 
            src={'/wal.jpg'} 
            alt='' 
            fill 
            className='-z-50 object-cover mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[10%]' 
          />
        </div>
      </div>
    </main>
  )
}
