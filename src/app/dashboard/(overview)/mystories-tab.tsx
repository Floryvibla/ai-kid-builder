'use client'

import { CarouselBox } from '@/components/carousel-section'
import { StoryCardEmpty } from '@/components/story-card-empty'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllMyStories } from '@/lib/data/fetch-mystories'
import { useEffect, useState } from 'react'

export default async function MyStorieTab() {

  const [data, setData] = useState<any>([])
  // console.log("data: ", data);
  
  useEffect(() => {
    getAllMyStories()
    .then((response:any[]) => {
      const sanitizanteIntro:any[] = []
      response?.map(i => {
        const intro = i.attributes.intro_story.data
        sanitizanteIntro.push({
          id: i.id,
          intro: {
            id: intro.id,
            ...intro.attributes
          }
        })
      })
      setData(sanitizanteIntro)
      console.log("sanitizanteIntro: ", sanitizanteIntro);
    })
  },[])
  

  return (
    <CarouselBox 
      items={data}
      childrenNavigation={(
        <TabsList className='border bg-white/20 text-gray-400'>
          <TabsTrigger value="my_stories">Minhas histórias</TabsTrigger>
          <TabsTrigger value="explorer">Explorar</TabsTrigger>
        </TabsList>
      )}
      carouselItemChildren={<StoryCardEmpty/>}
    />
  )
}
