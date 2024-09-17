import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const films = [
  "https://blackoutv.com/wp-content/uploads/2023/12/7KkHiZMvEdEZq2qrQX3kzYA7Off-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/3iS58y1wz2JVJ57HnI9D92fsYYh-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/c6zUhFMjZI63sHr3S9wIbddjAFC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/jJJuiyH3ibOA3VdUjrXA88HRxfS-scaled-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/eBU28W7OWFxhKluBQDHsKLFyL5p-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2024/01/8Wis3WRAb8BjfSiz2ATMDBXFtpC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2024/01/8Wis3WRAb8BjfSiz2ATMDBXFtpC-288x400.jpg",
  "https://blackoutv.com/wp-content/uploads/2023/12/u3jDgXLcbYH5EfrzghJGwsZRVnZ-288x400.jpg"
]

export function CardStory({item}:{item:any}) {
  return (
    <Card className="h-[300px] md:h-[315px] relative cursor-pointer hover:opacity-90">
      <Image 
        src={item}
        alt=""
        fill
        objectFit="cover"
        className="rounded-lg"
      />
    </Card>
  )
}

export function CarouselBox() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <div className="relative w-[100%] flex justify-end gap-5">
        <CarouselPrevious className="" />
        <CarouselNext className="" />
      </div>
      <div className="w-full mask-linear mask-dir-to-r  mask-point-from-[80%]">
        <CarouselContent className="">
          {films.map((item, index) => (
            <CarouselItem key={index} className="basis-[220px] lg:basis-[227px]">
              <div className="p-1">
                <CardStory item={item}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  )
}
