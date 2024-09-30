import { ICreateStoryJujuba } from "@/@types/story";
import { API } from "@/config/api";
import { createStoryJujuba } from "@/lib/data/stories";
import { isAuthorized, serverSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export interface GenerateStoryVideoJujuba {
  title: string;
  sinopse: string;
  moral_lesson: string;
  language: string;
}

export async function GET(req: NextRequest) {
  try {
    // Obtém o idioma preferido do usuário
    const acceptLanguage = req.headers.get('accept-language');
    let userLanguage = 'pt-BR'; // Idioma padrão

    if (acceptLanguage) {
      userLanguage = acceptLanguage.split(',')[0]
    }

    // Obtém a sessão do usuário
    const session = await serverSession();
    
    if (!session?.jwt) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Assume que o ID do usuário está disponível em session.user.id
    const userId = session.user.id;

    // Faz a chamada à API do Strapi, filtrando por owner e idioma
    const response = await API.get('/stories', {
      params: {
        locale: userLanguage,
        'filters[owner][$eq]': userId,
        populate: '*' // Isso irá popular todos os campos relacionados
      }
    });

    return NextResponse.json({
      data: response.data.data
    });

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
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
    const dataUser:ICreateStoryJujuba = await req.json()
    
    const response = await createStoryJujuba(dataUser)

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

