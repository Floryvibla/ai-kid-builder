'use client'

import React, { useState } from "react"
import Image from "next/image"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SelectItemBox } from "./select-item"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { ModalProvider } from "./modal-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

// Tipos
interface StoryData {
  age: string;
  message: string;
}

interface ChooseStoryProps {
  data: StoryData;
  onClickCard: () => void
}

// Componentes
const StoryChooseCard = ({onClick}:{onClick: () => void}) => (
  <Card 
    onClick={onClick}
    className='backdrop-blur-md bg-black/30 h-[150px] flex w-full gap-4 hover:bg-purple-400/10 hover:border-purple-700/70 cursor-pointer'
  >
    <div className="w-[30%] relative h-full">
      <Image 
        src={'https://blackoutv.com/wp-content/uploads/2023/12/7KkHiZMvEdEZq2qrQX3kzYA7Off-288x400.jpg'}
        alt=""
        fill
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="flex-1 p-1">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-semibold">
          Nenhuma história ainda
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-between p-0'>
        <CardDescription>
          Parece que você ainda não criou uma história. Adicione uma nova agora!
        </CardDescription>
      </CardContent>
    </div>
  </Card>
)

const ChooseStory: React.FC<ChooseStoryProps> = ({ data, onClickCard }) => (
  <>
    <DialogHeader>
      <DialogTitle className="mb-4 text-primary text-left">Escolhe uma História</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((_, index) => (
        <StoryChooseCard key={index} onClick={onClickCard} />
      ))}
    </div>
  </>
)

const StoryForm: React.FC<{ onSubmit: (data: StoryData) => void }> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      age: formData.get('age') as string,
      message: formData.get('message') as string
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mb-3">
        <SelectItemBox name="age"/>
      </div>
      <Textarea
        placeholder="Escreva a mensagem que deseja transmitir na história da sua criança"
        maxLength={200}
        name="message"
        className="border-gray-300/50 placeholder:text-gray-200/40 focus:border-amber-200/30"
      />
      <Button 
        variant={'outline'} 
        type="submit"
        className="w-full mt-6 rounded-full backdrop-blur-sm bg-purple-700/30 border-gray-300/30 py-6 hover:bg-purple-700/35"
      >
        Gerar história 
      </Button>
    </form>
  )
}

export const ModalView: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [generateStories, setGenerateStories] = useState<StoryData | null>(null)
  
  async function handleChooseStory() {
    
  }

  return (
    <ModalProvider>
      <DialogTrigger asChild>
        {children ?? 'Abrir'}
      </DialogTrigger>
      <DialogContent className="backdrop-blur-lg bg-black/40 border-gray-300/30 text-white">
        {generateStories ? (
          <ChooseStory data={generateStories} onClickCard={handleChooseStory} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="mb-4 text-primary text-left">Qual é a sua ideia para a história?</DialogTitle>
            </DialogHeader>
            <StoryForm onSubmit={setGenerateStories} />
          </>
        )}
      </DialogContent>
    </ModalProvider>
  )
}