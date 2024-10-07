import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from '@/components/ui/card'
import { BtnBack } from '@/components/button-client'


export default async function Page() {
  return (
    <ScrollArea className='text-white w-full h-screen pb-[10%]'>
      <div className='px-4 md:px-20'>
        <BtnBack/>
      </div>
      <div className='flex w-full h-[140px] md:h-[400px] relative'>
        <div className=' flex-1 flex flex-col justify-center'>
          <div className='px-5 md:px-20 gap-3 md:gap-6 absolute flex flex-col justify-center'>
            <h1 className='text-xl md:text-5xl'>Rebel Ridge Ridge Ridge</h1>
            <Button asChild className='px-5 w-[120px] md:w-[220px] md:text-2xl'> 
              <Link href={'/dashboard/story/watch/5'}>ASSISTIR</Link>
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
      <div className='p-5 text-gray-400 md:px-20 md:flex md:items-center md:gap-10'>
       <div>
        <h2 className='text-gray-200 font-semibold text-xl'>Sinopse</h2>
        <p className=''>
          Após um líder misterioso impor sua própria lei em um sistema brutal de celas verticais, uma mulher luta contra um método bizarro de distribuição de comida.
        </p>
       </div>
        <div className='mt-8 md:mt-0'>
          <h2 className='text-gray-200 font-semibold text-xl'>Moral da História</h2>
          <p className='text-gray-400'>
            Após um líder misterioso impor sua própria lei em um sistema brutal de celas verticais, uma mulher luta contra um método bizarro de distribuição de comida.
          </p>
        </div>
      </div>
      <div className='p-5 md:px-20'>
        <h2 className='text-gray-200 font-semibold text-2xl mb-4'>Similares</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6'>
          {[...Array(8)].map((_, index) => (
            <Card key={index} className='relative h-[300px] w-full overflow-hidden border-none hover:opacity-85 cursor-pointer'>
              <Link href={`/dashboard/story/${index+1}`}>
                <Image 
                  src={`/poster/${index%2}.jpeg`} // Substitua com os URLs corretos dos pôsteres dos filmes
                  alt={`Pôster do Filme ${index + 1}`}
                  fill
                  className='object-cover hover:scale-110 transition-all'
                />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
