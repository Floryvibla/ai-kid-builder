'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Player } from "@remotion/player";
import { Progress } from './ui/progress'
import { Pause, Play, Volume, VolumeOff } from 'lucide-react';
import { RemotionVideo } from './remotion/composition';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export function PreviewPlayer({message, progress}:{message: string, progress:number}) {
  return (
    // <div className='text-sm md:text-base w-full h-[450px] md:h-[600px] rounded-lg shadow-lg flex items-center justify-center flex-col gap-2 pt-5'>
    //   <h1>Criando sua historia...</h1>
    //   <div className=' bg-gray-500/30 rounded-lg w-[250px] md:w-[65%] h-full flex items-center justify-center flex-col px-5 gap-2'>
    //     <div>{message}</div>
    //     <Progress value={progress} />
    //   </div>
    // </div>
    <Player
      component={RemotionVideo}
      durationInFrames={120}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
    />
  )
}



export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = true,
  loop = true,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={cn(
      "relative w-full max-w-[350px] aspect-[9/16] mx-auto overflow-hidden rounded-lg shadow-lg",
      className
      )}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex justify-between items-center">
          <button
            onClick={togglePlay}
            className="text-white text-2xl focus:outline-none"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button
            onClick={toggleMute}
            className="text-white text-2xl focus:outline-none"
          >
            {isMuted ? <VolumeOff /> : <Volume />}
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div
            className="bg-red-600 h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
