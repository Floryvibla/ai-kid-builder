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
import axios from "axios"
import { LoaderIcon } from "lucide-react"
import { GenerateStoryVideoJujuba } from "@/app/api/stories/generate/route"
import clsx from "clsx"

// Tipos
interface StoryData {
  age: string;
  message: string;
}


interface ChooseStoryProps {
  data: GenerateStoryVideoJujuba[];
  indexActive: number | null
  onClickCard: (item:GenerateStoryVideoJujuba, index:number) => void
}

// Componentes
const StoryChooseCard = ({
  onClick, 
  item, 
  index,
  indexActive
}:{
  onClick: () => void, 
  item:GenerateStoryVideoJujuba, 
  index?:number, 
  indexActive: number | null
}) => (
  <Card 
    onClick={onClick}
    className={clsx(
      'backdrop-blur-md bg-black/30 h-[150px] flex w-full gap-4 hover:bg-purple-400/10 hover:border-purple-700/70 cursor-pointer',
      {
        "bg-purple-400/10 border-purple-700/70": index === indexActive
      }
    )}
  >
    <div className="w-[30%] rounded-tl-lg rounded-bl-lg relative h-full backdrop-blur-md bg-white/35 text-4xl text-center flex justify-center items-center">
      {/* <Image 
        src={'https://blackoutv.com/wp-content/uploads/2023/12/7KkHiZMvEdEZq2qrQX3kzYA7Off-288x400.jpg'}
        alt=""
        fill
        objectFit="cover"
        className="rounded-lg"
      /> */}
      {index!+1}
    </div>
    <div className="flex-1 p-1">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-semibold">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-between p-0 text-wrap'>
        <CardDescription>
          {item.sinopse}
        </CardDescription>
      </CardContent>
    </div>
  </Card>
)

const ChooseStory: React.FC<ChooseStoryProps> = ({ data, onClickCard, indexActive }) => (
  <>
    <DialogHeader className="text-left">
      <DialogTitle className="text-primary">Escolhe uma História</DialogTitle>
      <CardDescription className="text-gray-300">Clique num card para escolher uma história a ser criado</CardDescription>
    </DialogHeader>
    <div className="flex flex-col gap-2">
      {data.map((item, index) => (
        <StoryChooseCard 
          key={index} 
          item={item} 
          onClick={() => onClickCard(item, index)} 
          index={index} 
          indexActive={indexActive}
        />
      ))}
    </div>
  </>
)

const StoryForm: React.FC<{ onSubmit: (data: GenerateStoryVideoJujuba[]) => void }> = ({ onSubmit }) => {

  const [loading, setLoading] = useState(false)

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true)

    const formData = new FormData(event.currentTarget);

    const data = {
      age: formData.get('age') as string,
      message: formData.get('message') as string
    }
    try {
      const response = await axios.post('/api/stories/generate/intro', data)
      onSubmit(response.data)

    } catch (error) {
      console.log("Error to generate stories: ", error);
    }finally {
      setLoading(false)
    }
    
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
        disabled={loading}
      >
        {loading ? <LoaderIcon className="animate-spin"/> : "Gerar história" }
      </Button>
    </form>
  )
}

export const ModalView: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [generateStories, setGenerateStories] = useState<GenerateStoryVideoJujuba[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [storyIntroIndex, setStoryIntroIndex] = useState<number | null>(null)
  
  async function handleChooseStory(storyChoose:GenerateStoryVideoJujuba, index:number) {
    setStoryIntroIndex(index)
    setLoading(true)
    
    try {
      const response = await axios.post('/api/stories/generate', storyChoose)

      console.log("response: ", response.data);
      

    } catch (error) {
      console.log("Error to generate stories: ", error);
    }finally {
      setLoading(false)
    }
  }
  

  return (
    <ModalProvider>
      <DialogTrigger asChild>
        {children ?? 'Abrir'}
      </DialogTrigger>
      <DialogContent className="backdrop-blur-lg bg-black/40 border-gray-300/30 text-white">
        {generateStories ? (
          <ChooseStory data={generateStories} onClickCard={handleChooseStory} indexActive={storyIntroIndex} />
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