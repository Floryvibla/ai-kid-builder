import { IGenerateIntroStory, IIntroStory } from "./intro";
import { ISceneStory } from "./scene";

export interface ICreateStory {
  intro_story?: number;
  user_prompt: number;
  story_scenes?: number[]
  owner: number
  state?: IStoryState
}

export type IStoryState = 'starting' | 'scenes' | 'images' | 'audios' | 'videos' | 'complet'

export interface ICreateStoryJujuba {
  user_prompt: IGenerateIntroStory,
  story?: IIntroStory
}