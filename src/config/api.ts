import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import axios, { AxiosInstance } from 'axios';
import { getServerSession } from 'next-auth';

export const baseURLApi= process.env.NEXT_PUBLIC_API_URL

export const API: AxiosInstance = axios.create({
  baseURL: baseURLApi, 
});

export const headersAPI = async () => {
    const session = await getServerSession(authOptions)
    const headers = {
        Authorization: `Bearer ${session}`
    };

    return headers
};
