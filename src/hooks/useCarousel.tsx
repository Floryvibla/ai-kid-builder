import { CarouselApi } from '@/components/ui/carousel'
import React from 'react'

export function useCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [count, setCount] = React.useState(0)
  const [cardIndex, setCardIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCardIndex(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCardIndex(api.selectedScrollSnap())
    })
  }, [api])

  return {
    api,
    count,
    cardIndex,
    setCardIndex,
    setApi,
    setCount
  }
}
