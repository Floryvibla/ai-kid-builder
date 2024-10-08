import { cn } from "@/lib/utils";
import axios from "axios";
import Image, { ImageProps } from "next/image";

interface FetchImageProps extends Partial<Omit<ImageProps, 'src' | 'alt'>> {
  url: string
  alt: string;
}

export async function FetchImage({
  url,
  alt,
  fill = true,
  ...props
}: FetchImageProps) {

  const fetchUrlImg = axios.get(url)
  const base64Img = (await fetchUrlImg).data

  return (
    <Image 
      src={`data:image/jpeg;base64,${base64Img}`} 
      alt={alt} 
      fill={fill}
      {...props} 
    />
  )
}