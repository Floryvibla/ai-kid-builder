import { IGenerateIntroStory, IIntroStory, ITopStoryProps } from "@/@types/intro"
import { API, API_FRONT } from "@/config/api"

export const generateIntro = async (data: IGenerateIntroStory) => {
  const response = await API_FRONT.post('/stories/generate/intro', data, {responseType: 'stream'})
  return response.data
}

export const createIntroStoryJujuba = async (data:IIntroStory) => {
  const response = await API.post('/intro-stories', {data});
  return response.data;
}

export const getTopStory = async (slug:string) => {
  
  let userLanguage = 'pt-BR'; // Default language

  const response = await API.get('/intro-stories', {
    params: {
      locale: userLanguage,
      'filters[slug][$eq]': slug,
      'populate[0]': 'story',
      'fields[0]': 'title',
      'fields[1]': 'cover_img',
      'fields[2]': 'slug'
    }
  });

  if (!response.data || !response.data.data || response.data.data.length === 0) {
    return { error: 'Story not found', data: null }
  }

  const data = response.data.data[0];
  const sanitized = {
    id: data.id,
    ...data.attributes,
    story: {
      id: data.attributes.story.data.id,
    },
  }

  return { error: false, data: sanitized }
}