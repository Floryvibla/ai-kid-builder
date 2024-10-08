import { IGenerateIntroStory, IIntroStory } from "@/@types/intro"
import { ICreateStoryJujuba } from "@/@types/story"
import { API, API_FRONT } from "@/config/api"
import { EndpointKeys } from "@/constants/api";
import { sanitizedStory } from "../sanitizante";

interface FetchParams {
  language?: string;
  slug?: string;
  additionalParams?: Record<string, any>;
}

export const generateIntro = async (data: IGenerateIntroStory) => {
  const response = await API_FRONT.post<IIntroStory[]>('/stories/generate/intro', data)
  return response.data
}

export const createStoryJujuba = async (data:ICreateStoryJujuba) => {
  const response = await API.post('/stories/generate', data, {responseType: 'stream'});
  return response.data;
}

export const createStory = async (data:ICreateStoryJujuba) => {
  const response = await fetch('/api/stories/mystories', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const reader = response.body?.getReader()

  return reader
}

export const fetchStory = async(endpoint: EndpointKeys, {
  language= 'pt-BR',
  slug,
  additionalParams = {}
}:FetchParams) => { 

  const paramsWithSlug = {
    'filters[slug][$eq]': slug,
    'populate[0]': 'story',
  }

  const paramsWithoutSlug = {
    locale: language,
    ...additionalParams,
  };

  const params = slug? paramsWithSlug : paramsWithoutSlug;

  try {
    const response = await API.get(endpoint, {params})

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return { error: 'Data not found', data: null };
    }

    const dataSanitized = sanitizedStory[endpoint](response.data.data)
    

    return { data: dataSanitized, error: null }
    
  } catch (error:any) {
    console.error("Error fetching data:", error.response.data);
    return { error: 'An error occurred while fetching data', data: null };
  }
}