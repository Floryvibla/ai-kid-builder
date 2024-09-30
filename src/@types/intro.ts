export interface IIntroStory {
  title: string
  sinopse: string
  moral_lesson: string
  cover_prompt: string
  story?: number
}

export interface IGenerateIntroStory {
  age: string;
  message: string;
  owner?: number
  story?: number
}
