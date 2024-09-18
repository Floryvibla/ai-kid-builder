'use client'

import * as React from "react"

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import clsx from "clsx"

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

interface PropsCard {
  items: any[]
  // isActive: boolean
}

export function CardStory({item, isActive}:{item:any, isActive: boolean}) {
  return (
    <Card className={clsx("h-[300px] md:h-[315px] relative cursor-pointer hover:opacity-90", {
      'border-primary border-4': isActive
    })}>
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

export function CarouselBox({ items }: PropsCard) {

  const [cardIndex, setCardIndex] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const handleOnclickCard = (index:number) => {
    setCardIndex(index)
  }

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCardIndex(api.selectedScrollSnap())
 
    api.on("select", (teste) => {
      console.log("Yeees: ", teste.canScrollNext());
      
      setCardIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      setApi={setApi}
    >
      <div className="relative w-[100%] flex justify-end gap-5">
        <CarouselPrevious className="" />
        <CarouselNext className="" />
      </div>
      <div className={clsx("w-full", {'mask-linear mask-dir-to-r  mask-point-from-[80%]': (count-1) !== cardIndex})}>
        <CarouselContent className="">
          {items.map((item, index) => (
            <CarouselItem 
              key={index} 
              onClick={() => handleOnclickCard(index)}
              className="basis-[220px] lg:basis-[227px]"
            >
              <div className="p-1">
                <CardStory item={item} isActive={index === cardIndex}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  )
}
