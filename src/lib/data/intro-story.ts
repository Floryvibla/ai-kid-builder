import { IGenerateIntroStory, IIntroStory } from "@/@types/intro"
import { API, API_FRONT } from "@/config/api"

export const generateIntro = async (data: IGenerateIntroStory) => {
  const response = await API_FRONT.post('/stories/generate/intro', data, {responseType: 'stream'})
  return response.data
}

export const createIntroStoryJujuba = async (data:IIntroStory) => {
  const response = await API.post('/intro-stories', {data});
  return response.data;
}