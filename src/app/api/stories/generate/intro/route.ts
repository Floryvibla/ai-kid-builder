import { API } from "@/config/api";
import { StreamingResponse, encoderStream, getUserLanguage, isAuthorized, iteratorToStream, makeIteratorError, serverSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Readable } from "stream";

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
    
    // const response = await generateStories(dataUser)
    const responseStream = await streamData(dataUser)

    return new NextResponse(responseStream)

  } catch (error:any) {
    const iterator = makeIteratorError(JSON.stringify({error: 'Error generating Intro Story', status: 500, data: null, message: 'Error'}))
    const stream = iteratorToStream(iterator)
    console.error("Error: ", error.response.data);
    return NextResponse.json(stream, { status: 500 });
  }
}

async function generateStories(data:{age:string, message:string}) {
  const response = await API.post('/intro-stories/generate', data);
  return response.data;
}

async function streamData(data:any) {
  const response = await API.post('/intro-stories/generate', data, {responseType: 'stream'});

  const nodeStream:Readable = response.data;

  const readableStream = new ReadableStream({
    async start(controller) {
      nodeStream.on('data', (chunk) => {
        controller.enqueue(chunk);
      });
      nodeStream.on('end', () => controller.close());
      nodeStream.on('error', (err) => controller.error(err));
    },
  });

  return readableStream;
}