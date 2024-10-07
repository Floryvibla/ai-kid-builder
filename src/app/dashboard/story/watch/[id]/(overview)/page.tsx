import { BtnBack } from '@/components/button-client'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { VideoPlayer } from '@/components/video-player'
import Image from 'next/image'
import React from 'react'

export default async function Page() {
  return (
    <div className='text-white w-full h-full '>
      <div className='px-4 md:px-20'>
        <BtnBack/>
      </div>
      <div className='w-full h-[80%] flex items-center justify-center'>
        <Carousel
          orientation='vertical'
          opts={{
            align: "start",
          }}
          className="w-full max-w-xs h-[600px] flex relative"
        >
          <CarouselContent className="h-full w-full max-w-xs -mt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="h-full w-full max-w-full flex items-center justify-center">
                <div className="w-full max-w-full h-full flex items-center justify-center">
                  <Card className="w-full max-w-full h-full flex items-center justify-center bg-transparent border-none">
                    <CardContent className="w-screen h-full flex items-center justify-center p-6 text-black">
                      {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                      <VideoPlayer
                        src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
                        className='w-full h-full'
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='hidden lg:block'>
            <div className='absolute -right-24 flex flex-col h-full justify-center gap-5'>
              <CarouselPrevious 
                className='rotate-90 w-14 h-14'
                classnameIcon='w-6 h-6' 
              />
              <CarouselNext 
                className='rotate-90 w-14 h-14'
                classnameIcon='w-6 h-6' 
              />
            </div>
          </div>
        </Carousel>
      </div>
      <div className='absolute top-0 backdrop-blur-md bg-black/40 h-screen w-screen -z-40'/>
      <div className='absolute -z-50 w-screen h-screen top-0'>
        <Image 
          src={'/wal.jpg'} 
          alt='' 
          fill 
          className='object-cover mask-linear mask-dir-to-b mask-from-[1] mask-point-from-[50%]' 
        />
      </div>
    </div>
  )
}