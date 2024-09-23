import { API_FRONT } from "@/config/api";

export async function getAllMyStories() {
  const response = await API_FRONT.get('/mystories')
  return response.data.data
}