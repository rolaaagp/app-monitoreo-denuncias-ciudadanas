import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T = any> {
  statusCode: number;
  status: string;
  message: string;
  data: T;
}

export const PRE_FIXES = {
  DENUNCIAS: "central-denuncias-api",
  USERS: "central-usuarios-api",
};

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: { "Content-Type": "application/json" },
    });

    this.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error("HTTP Error:", error?.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

// const API_URL = Constants.expoConfig?.extra?.apiUrl as string;
const API_URL = "https://api.cloudynex.cl";
export const httpClient = new HttpClient(API_URL);
