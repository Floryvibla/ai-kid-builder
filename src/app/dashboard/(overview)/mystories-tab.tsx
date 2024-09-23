import { CarouselBox } from '@/components/carousel-section'
import { StoryCardEmpty } from '@/components/story-card-empty'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllMyStories } from '@/lib/data/fetch-mystories'

export default async function MyStorieTab() {

  // const data = await getAllMyStories()

  return (
    <CarouselBox 
      items={[]}
      childrenNavigation={(
        <TabsList className='border bg-white/20 text-gray-400'>
          <TabsTrigger value="my_stories">Minhas histórias</TabsTrigger>
          <TabsTrigger value="explorer">Explorar</TabsTrigger>
        </TabsList>
      )}
      carouselItemChildren={<StoryCardEmpty/>}
    />
  )
}
