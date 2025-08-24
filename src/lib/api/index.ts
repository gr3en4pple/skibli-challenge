import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const axioxCore = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT!,
  headers: {
    "Content-Type": "application/json",
  },
});

class HttpClient {
  private _instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this._instance = axiosInstance;

    this._instance.interceptors.response.use(
      function (response) {
        return response.data;
      },
      function (error) {
        const { status, data } = error.response;

        if (status === 401) {
          if (!window.location.pathname.includes("/auth")) {
            window.location.href = "/auth/login";
          }
          return data;
        }

        if (Boolean(data?.message)) {
          toast.warning(data.message, {});
          return data;
        }

        return Promise.reject(error);
      },
    );
  }

  get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this._instance.get(endpoint, config);
  }
  post<T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this._instance.post(endpoint, data, config);
  }
  put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this._instance.put(endpoint, data, config);
  }
  delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this._instance.delete(endpoint, config);
  }
}
const api = new HttpClient(axioxCore);
export default api;
