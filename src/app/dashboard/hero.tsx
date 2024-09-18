'use client'


import { CarouselBox } from '@/components/carousel-section'
import { ModalView } from '@/components/modal-view'
import Image from 'next/image'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

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
            <CarouselBox 
              items={films1}
              childrenNavigation={(
                <TabsList className='border bg-white/20 text-gray-400'>
                  <TabsTrigger value="my_stories">Minhas histórias</TabsTrigger>
                  <TabsTrigger value="explorer">Explorar</TabsTrigger>
                </TabsList>
              )}
              carouselItemChildren={(
                <CarouselItem className='basis-[220px] lg:basis-[227px]'>
                  <Card className='backdrop-blur-md bg-black/30 h-[300px] md:h-[315px] flex flex-col'>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold ">
                        Nenhuma história ainda
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 flex flex-col justify-between'>
                        <p className="text-gray-300 mb-4">
                          Parece que você ainda não criou uma história. Adicione uma nova agora!
                        </p>
                        <ModalView>
                          <Button className="flex items-center justify-center gap-2 w-full bg-purple-700 hover:bg-purple-700/80">
                            <PlusIcon className="w-5 h-5" />
                            Adicionar 
                          </Button>
                        </ModalView>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
            />
          </TabsContent>
          <TabsContent value="explorer">
            <CarouselBox 
              items={films2}
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
