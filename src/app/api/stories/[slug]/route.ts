import { API } from "@/config/api";
import { isAuthorized, serverSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    slug: string;
  } 
}

export async function GET(req: NextRequest, { params: { slug } }: Params) {
  try {
    const acceptLanguage = req.headers.get('accept-language');
    let userLanguage = 'pt-BR'; // Default language

    if (acceptLanguage) {
      userLanguage = acceptLanguage.split(',')[0]
    }

    // Get user session
    const session = await serverSession();

    console.log("session: ", session);
    
    
    if (!session?.jwt) {
      console.log("session2: ", session);
      
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    // Assume user ID is available in session.user.id
    const userId = session?.user.id;

    const { searchParams } = new URL(req.url);
    const paramsObject = Object.fromEntries(searchParams.entries());

    const response = await API.get('/intro-stories', {
      params: {
        locale: userLanguage,
        'filters[slug][$eq]': slug,
        'populate[0]': 'story',
        ...paramsObject
      }
    });

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return NextResponse.json({ error: 'Story not found', data: null }, { status: 404 });
    }

    const data = response.data.data[0];
    const sanitized = {
      id: data.id,
      ...data.attributes,
      story: {
        id: data.attributes.story.data.id,
      },
    }

    return NextResponse.json({ data: sanitized });

  } catch (error: any) {
    console.error("Error occurred:", error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    } else if (error.response?.status === 403) {
      return NextResponse.json({ error: 'Access forbidden' }, { status: 403 });
    } else if (error.response?.status === 400) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred' }, 
        { status: 500 }
      );
    }
  }
}