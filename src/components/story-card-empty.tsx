import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import { ModalView } from '@/components/modal-view'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export function StoryCardEmpty() {
  return (
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
  )
}
