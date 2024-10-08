import { IntroResponse } from "@/@types/intro"
import { fetchStory } from "@/lib/data/stories"
import { Card } from "./ui/card"
import Link from "next/link"
import { FetchImage } from "./fetch-image"

export async function RecomendationStory({ slug }: { slug: string }) {
  try {
    
    const response = await fetchStory('/stories', {
      additionalParams: {
        'populate[0]': 'intro_story',
      }
    })

    const data:any = response.data
    return (
      <div>
        <h2 className='text-gray-200 font-semibold text-2xl mb-4'>Similares</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6'>
          {data.map((item:any, index:number) => (
            <Card key={index} className='relative h-[250px] w-full overflow-hidden border-none hover:opacity-85 cursor-pointer'>
              <Link href={`/dashboard/story/${item.attributes.intro_story.data.attributes.slug}`}>
                <FetchImage 
                  url={item.attributes.intro_story.data.attributes.cover_img} // Substitua com os URLs corretos dos pôsteres dos filmes
                  alt={item.attributes.intro_story.data.attributes.title}
                  fill
                  className='object-cover hover:scale-110 transition-all'
                />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    )
  } catch (error:any) {
    console.error('Error fetching Sinopse story:', error)
    return <RecomendationStoryLoading />
  }
}

export function RecomendationStoryLoading() {
  return (
    <div className="relative animate-pulse">
      <h2 className='text-gray-200 font-semibold text-2xl mb-4'>Similares</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6'>
          {[...Array(6)].map((_, index) => (
            <Card 
              key={index} 
              className='h-[300px] w-full border-none bg-white/70'
            />
          ))}
        </div>
    </div>
  )
}