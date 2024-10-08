import React, { Suspense } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { BtnBack } from '@/components/button-client'
import TopStory, { TopStoryLoading } from './top'
import { MiddleStory } from './middle'
import { RecomendationStory, RecomendationStoryLoading } from '@/components/recomendation'

interface IPage {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Page({
  params,
  searchParams,
}:IPage) {
  
  return (
    <ScrollArea className='text-white w-full h-screen pb-[10%]'>
      <div className='px-4 md:px-20'>
        <BtnBack/>
      </div>
      <Suspense fallback={<TopStoryLoading/>}>
        <TopStory slug={params.slug}/>
      </Suspense>
      <div className='p-5 text-gray-400 md:px-20 md:flex md:items-center md:gap-10 md:w-full'>
        <div className='md:flex-1 md:w-full'>
          <h2 className='text-gray-200 font-semibold text-xl md:text-2xl'>Sinopse</h2>
          <Suspense>
            <MiddleStory slug={params.slug} field='sinopse'/>
          </Suspense>
        </div>
        <div className='mt-8 md:mt-0 md:flex-1'>
          <h2 className='text-gray-200 font-semibold text-xl'>Moral da História</h2>
          <div className='text-gray-400'>
            <Suspense>
              <MiddleStory slug={params.slug} field='moral_lesson'/>
            </Suspense>
          </div>
        </div>
      </div>
      <div className='p-5 md:px-20'>
        <Suspense fallback={<RecomendationStoryLoading/>}>
          <RecomendationStory slug={params.slug}/>  
        </Suspense>
      </div>
    </ScrollArea>
  )
}
