import React from 'react'

export function TabStoryLoading() {
  return (
    <div className="flex items-center gap-4">
      {[...Array(2)].map((_, index) => (
        <div 
          key={index} 
          className="backdrop-blur-md bg-white/30 shadow-md rounded-lg p-4 animate-pulse basis-[420px] lg:basis-[227px] h-[300px] md:h-[315px]"
        >
          {/* <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div> */}
        </div>
      ))}
    </div>
  )
}

export function StoryChooseCardLoading() {
  return (
    <div className="backdrop-blur-md bg-white/10 h-[150px] flex w-full gap-4 animate-pulse rounded-lg">
      
    </div>
  )
}