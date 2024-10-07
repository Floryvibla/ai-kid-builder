import { IGenerateIntroStory } from "@/@types/intro";
import { ISceneStory } from "@/@types/scene";
import { API } from "@/config/api";
import { getUserLanguage, isAuthorized, serverSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export interface GenerateStoryVideoJujuba {
  title: string;
  sinopse: string;
  moral_lesson: string;
  language: string;
  images: {
    landscape: string
    portrait: string;
  }
}

interface BodyGenerateStoryVideoJujuba {
  storyChoose:GenerateStoryVideoJujuba
  introData: IGenerateIntroStory
}

export async function POST(req: NextRequest) {
  try {

    // const userLanguage = getUserLanguage(req);
    const session = await serverSession();
    
    if (!session || !isAuthorized(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Assume que o ID do usuário está disponível em session.user.id
    const userId = session.user.id;
    const dataUser:BodyGenerateStoryVideoJujuba = await req.json()
    
    const response = await generateStories(dataUser.storyChoose)

    return NextResponse.json(JSON.parse(response));

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

async function generateStories(data:GenerateStoryVideoJujuba) {
  const response = await API.post('/stories/generate', data);
  return response.data;
}

async function createScene(data:ISceneStory) {
  const response = await API.post('/stories/generate', data);
  return response.data;
}