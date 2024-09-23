import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function serverSession() {
  const session = await getServerSession(authOptions);

  return session
}