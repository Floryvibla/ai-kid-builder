import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { NextRequest } from "next/server";

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