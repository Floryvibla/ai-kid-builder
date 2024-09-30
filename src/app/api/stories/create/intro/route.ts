import { IIntroStory } from "@/@types/intro";
import { API } from "@/config/api";
import { createIntroStoryJujuba } from "@/lib/data/intro-story";
import { getUserLanguage, isAuthorized, serverSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const userLanguage = getUserLanguage(req);
    const session = await serverSession();
    
    if (!session || !isAuthorized(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Assume que o ID do usuário está disponível em session.user.id
    const owner = session.user.id;
    const dataUser = await req.json()
    
    const response = await createIntroStoryJujuba({...dataUser, owner})

    return NextResponse.json(response);

  } catch (error:any) {
    console.error("Error: ", error.response.data);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

