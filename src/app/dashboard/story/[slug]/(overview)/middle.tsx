import { IntroResponse } from "@/@types/intro"
import { fetchStory } from "@/lib/data/stories"

export async function MiddleStory({ slug, field }: { slug: string, field: 'sinopse' | 'moral_lesson'}) {
  try {
    
    const response = await fetchStory('/intro-stories', { 
      slug,
      additionalParams: {
        'fields[0]': 'sinopse',
        'fields[1]': 'moral_lesson',
      }
    })

    const data:IntroResponse = response.data

    return (
      <p className='md:text-xl'>{data[field]}</p>
    )
  } catch (error:any) {
    console.error('Error fetching Sinopse story:', error)
    return <MiddleStoryLoading />
  }
}

export function MiddleStoryLoading() {
  return (
    <div className="relative animate-pulse space-y-2 w-full">
      <p className="w-full py-1.5 md:py-2 rounded-lg bg-white/30 mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[90%]"/>
      <p className="w-[95%] py-1.5 md:py-2 rounded-lg bg-white/30 mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[90%]"/>
      <p className="w-[90%] py-1.5 md:py-2 rounded-lg bg-white/30 mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[90%]"/>
      <p className="w-[75%] py-1.5 md:py-2 rounded-lg bg-white/30 mask-linear mask-dir-to-l mask-from-[1] mask-point-from-[90%]"/>
    </div>
  )
}