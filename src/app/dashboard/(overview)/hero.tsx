'use client'


import { CarouselBox } from '@/components/carousel-section'
import { ModalView } from '@/components/modal-view'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { StoryCardEmpty } from '@/components/story-card-empty'
import MyStorieTab from './mystories-tab'
import { TabStoryLoading } from '@/components/loadings'

const films1 = [
  "https://blackoutv.com/wp-content/uploads/2023/12/7KkHiZMvEdEZq2qrQX3kzYA7Off-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/3iS58y1wz2JVJ57HnI9D92fsYYh-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/c6zUhFMjZI63sHr3S9wIbddjAFC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/jJJuiyH3ibOA3VdUjrXA88HRxfS-scaled-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/eBU28W7OWFxhKluBQDHsKLFyL5p-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2024/01/8Wis3WRAb8BjfSiz2ATMDBXFtpC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2024/01/8Wis3WRAb8BjfSiz2ATMDBXFtpC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/u3jDgXLcbYH5EfrzghJGwsZRVnZ-288x400.jpg"
]

const films2 = [
  "https://blackoutv.com/wp-content/uploads/2023/12/eBU28W7OWFxhKluBQDHsKLFyL5p-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2024/01/8Wis3WRAb8BjfSiz2ATMDBXFtpC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2024/01/8Wis3WRAb8BjfSiz2ATMDBXFtpC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/u3jDgXLcbYH5EfrzghJGwsZRVnZ-288x400.jpg"
]

export function HeroStory() {
  const [tabActive, setTabActive] = React.useState<'my_stories' | 'explorer'>('my_stories')

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
        <Tabs defaultValue={tabActive} className="">
          <TabsContent value="my_stories">
            <Suspense fallback={<TabStoryLoading/>}>
              <MyStorieTab/>
            </Suspense>
          </TabsContent>
          <TabsContent value="explorer">
            <CarouselBox 
              items={[]}
              childrenNavigation={(
                <TabsList className='border backdrop-blur-md bg-black/40'>
                  <TabsTrigger value="my_stories">Minhas histórias</TabsTrigger>
                  |
                  <TabsTrigger value="explorer">Explorar</TabsTrigger>
                </TabsList>
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
