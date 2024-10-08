export interface IIntroStory {
  title: string
  sinopse: string
  moral_lesson: string
  cover_prompt: string
  story?: number
}

export interface ITopStoryProps {
  slug: string,
  id: number,
  cover_img: string,
  title: string,
  story: {
    id: number,
  }
}

export interface IGenerateIntroStory {
  age: string;
  message: string;
  owner?: number
  story?: number
}

export interface IntroResponse {
  id: number;
  slug: string;
  title: string;
  sinopse: string;
  moral_lesson: string;
  cover_prompt: string;
  createdAt: string; // Pode usar `Date` se preferir manipular como data
  updatedAt: string; // Pode usar `Date` se preferir manipular como data
  locale: string;
  cover_img: string;
  story: {
    id: number
  };
}
