import { IGenerateIntroStory, IIntroStory } from "@/@types/intro"
import { ICreateStoryJujuba } from "@/@types/story"
import { API, API_FRONT } from "@/config/api"

export const generateIntro = async (data: IGenerateIntroStory) => {
  const response = await API_FRONT.post<IIntroStory[]>('/stories/generate/intro', data)
  return response.data
}

export const createStoryJujuba = async (data:ICreateStoryJujuba) => {
  const response = await API.post('/stories/generate', data);
  return response.data;
}

export const createStory = async (data:ICreateStoryJujuba) => {
  const response = await API_FRONT.post('/stories/mystories', data);
  return response.data;
}