import { ITopStoryProps } from "@/@types/intro"
import { EndpointKeys } from "@/constants/api"


const sanitizedTop = (data:any):ITopStoryProps => { 
  const sanitized = {
    id: data.id,
    ...data.attributes,
    story: {
      id: data.attributes.story.data.id,
    },
  }

  return sanitized
}

export const sanitizedStory: Record<EndpointKeys, (data: any) => any> = {
  '/intro-stories': (data:any) => sanitizedTop(data[0]),
  '/stories': (data: any) => data,
  '/images-scenes': (data: any) => data,
  '/story-scenes': (data: any) => data,
}