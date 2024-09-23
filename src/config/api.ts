import { serverSession } from '@/lib/utils';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const baseURLApi = process.env.NEXT_PUBLIC_API_URL;

export const API: AxiosInstance = axios.create({
  baseURL: baseURLApi,
});

export const API_FRONT: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONT_API_URL,
});

// Função para obter o token JWT
const getJWTToken = async (): Promise<string | null> => {
  const session = await serverSession();
  return session?.jwt || null;
};

// Interceptor para adicionar o token JWT ao header de cada requisição
API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getJWTToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para obter headers com o token JWT (caso precise usar separadamente)
export const getAuthHeaders = async () => {
  const token = await getJWTToken();
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};