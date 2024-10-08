'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

interface Props {
  children?: React.ReactNode
  asChild?: boolean
}

export default function ButtonAuthCTA({children= 'Criar história', asChild}:Props) {

  const { data:session } = useSession()
  const router = useRouter()
  
  const handleSign = () => {
    if(asChild) return null
    if(session) return router.push('/dashboard')
    signIn('google', { callbackUrl: "/dashboard" })
  }

  // console.log('session: ', session);
  

  return (
    <Button
      className='bg-purple-700 mt-4 text-lg md:text-2xl font-bold md:p-7 md:rounded-2xl shadow-2xl hover:bg-purple-700/90'
      onClick={handleSign}
      asChild={asChild}
    >
      {children}
    </Button>
  )
}


export function BtnBack({title='Voltar'}:{title?:string}) {
  const router = useRouter()
  return (
    <Button 
      onClick={() => router.back()}
      variant={'ghost'}
      className='flex items-center px-0 py-0'
    >
      <ChevronLeft/>
      <span>{title}</span>
    </Button>
  )
}
