import { API } from "@/config/api";
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
    const userId = session.user.id;
    const dataUser = await req.json()
    
    const response = await generateStories(dataUser)

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

async function generateStories(data:{age:string, message:string}) {
  const response = await API.post('/intro-stories/generate', data);
  return response.data;
}