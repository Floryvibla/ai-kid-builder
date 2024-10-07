import { API_FRONT } from "@/config/api";

export async function getAllMyStories(query?:string) {
  const response = await API_FRONT.get('/stories/mystories')
  return response.data.data
}