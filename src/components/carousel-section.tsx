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
import axios from "axios"
import { ModalProvider } from "./modal-provider"
import { DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { VideoPlayer } from "./video-player"
import { useCarousel } from "@/hooks/useCarousel"
import Link from "next/link"

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
  childrenNavigation?: React.ReactNode
  carouselItemChildren?: React.ReactNode
  children?: React.ReactNode
}

export function CardStory({item, isActive}:{item:any, isActive: boolean}) {

  const [imageBase64, setImageBase64] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(item.intro.cover_img);
        const base64 = response.data
        setImageBase64(base64);
      } catch (error) {
        console.error('Erro ao buscar a imagem:', error);
      }
    };

    fetchImage();
  }, [item.intro.cover_img]);

  return (
    <Card className={clsx("h-[300px] md:h-[315px] relative cursor-pointer hover:opacity-90", {
      'border-primary border-4': isActive
    })}>
      <Image 
        src={`data:image/jpeg;base64,${imageBase64}`}
        alt=""
        fill
        objectFit="cover"
        className="rounded-lg"
      />
    </Card>
  )
}

export function CarouselBox({ items, childrenNavigation, carouselItemChildren,  }: PropsCard) {

  const {
    cardIndex, count, setApi, setCardIndex
  } = useCarousel()

  const handleOnclickCard = (index:number, item:any) => {
    setCardIndex(index)
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      setApi={setApi}
    >
      <div className="relative w-[100%] flex justify-between items-center mb-4">
        <div>
          {childrenNavigation}
        </div>
        <div className="flex items-center gap-5">
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </div>
      </div>
      <div className={clsx("w-full", {'mask-linear mask-dir-to-r  mask-point-from-[80%]': (count-1) !== cardIndex})}>
        <CarouselContent className="">
          {items.length > 0 ? items.map((item, index) => (
            <CarouselItem 
              key={index} 
              onClick={() => handleOnclickCard(index, item)}
              className="basis-[220px] lg:basis-[227px]"
            >
              <div className="p-1">
                <Link href={`/dashboard/story/${item.id}`}>
                  <CardStory item={item} isActive={index === cardIndex}/>
                </Link>
              </div>
            </CarouselItem>
          )) : carouselItemChildren ?? null}
        </CarouselContent>
      </div>
    </Carousel>
  )
}
