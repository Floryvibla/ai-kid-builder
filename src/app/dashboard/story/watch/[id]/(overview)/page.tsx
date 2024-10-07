import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { VideoPlayer } from '@/components/video-player'
import React from 'react'

export default async function Page() {
  return (
    <div className='text-white relative px-5 md:px-20 w-full h-[90%] flex items-center justify-center'>
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
  )
}