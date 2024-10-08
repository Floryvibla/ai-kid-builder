import { IntroResponse } from '@/@types/intro'
import { FetchImage } from '@/components/fetch-image'
import { Button } from '@/components/ui/button'
import { fetchStory } from '@/lib/data/stories'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default async function TopStory({ slug }: { slug: string}) {
  try {
    
    const response = await fetchStory('/intro-stories', { 
      slug,
      additionalParams: {
        'fields[0]': 'title',
        'fields[1]': 'cover_img',
        'fields[2]': 'slug'
      }
    })

    const data:IntroResponse = response.data

    return (
      <div className='flex w-full h-[140px] md:h-[400px] relative'>
        <div className=' flex-1 flex flex-col justify-center'>
          <div className='px-5 md:px-20 gap-3 md:gap-6 absolute flex flex-col justify-center'>
            <h1 className='text-xl md:text-5xl'>{data.title}</h1>
            <Button asChild className='px-5 w-[120px] md:w-[220px] md:text-2xl'> 
              <Link href={`/dashboard/story/watch/${data.slug}`}>ASSISTIR</Link>
            </Button>
          </div>
        </div>
        <div className='relative w-[50%] flex-[3]'>
          <Suspense fallback={<ImageBanerLoading/>}>
            <FetchImage
              url={data.cover_img}
              alt={data.title} 
              fill 
              className='-z-50 object-cover mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[10%]'
            />
          </Suspense>
        </div>
      </div>
    )
  } catch (error:any) {
    console.error('Error fetching top story:', error)
    return <TopStoryLoading />
  }
}

const ImageBanerLoading = () => (
  <div 
    className='-z-50 animate-pulse bg-white/40 w-full h-full mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[10%]'
  />
)

function ErrorFallback() {
  return (
    <div className="flex w-full h-[140px] md:h-[400px] relative bg-gray-200 justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl md:text-3xl text-gray-700 mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-600">We couldn't load the top story. Please try again later.</p>
      </div>
    </div>
  )
}


export function TopStoryLoading() {
  return (
    <div className="flex w-full h-[140px] md:h-[400px] relative animate-pulse bg-white/10 mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[10%]">
      <div className=' flex-1 flex flex-col justify-center'>
        <div className='px-5 md:px-20 gap-3 md:gap-6 absolute flex flex-col justify-center'>
          <div className='text-xl md:text-5xl w-[200px] h-[15px] rounded-md bg-white/20'/>
          <div className='px-5 w-[120px] md:w-[220px] h-[40px] bg-white/20 rounded-md'/> 
        </div>
      </div>
    </div>
  )
}
