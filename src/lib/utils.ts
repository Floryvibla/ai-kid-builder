import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { NextRequest } from "next/server";
import { Readable } from "stream";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function serverSession() {
  const session = await getServerSession(authOptions);

  return session
}

export function getUserLanguage(req: NextRequest): string {
  const acceptLanguage = req.headers.get('accept-language');
  return acceptLanguage ? acceptLanguage.split(',')[0] : 'pt-BR';
}

export function isAuthorized(session: any): boolean {
  return !!session?.jwt;
}

export function iteratorToStream(iterator: AsyncIterableIterator<any>) {
  return new Readable({
    async read() {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      } catch (err) {
        this.emit('error', err);
      }
    }
  });
}

export async function* makeIteratorError(error:any)  {
  yield encoderStream.encode(error)
}

export const encoderStream = new TextEncoder();
export const decoderStream = new TextDecoder();

export class StreamingResponse extends Response {

  constructor( res: ReadableStream<any>, init?: ResponseInit ) {
    super(res as any, {
      ...init,
      status: 200,
      headers: {
        ...init?.headers,
      },
    });
  }
}


export const sleep = (time?:number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Promessa resolvida após ${time ?? 2000} segundos!`);
    }, time??2000); // 2000 milissegundos = 2 segundos
  });
};