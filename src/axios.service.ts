import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Inject } from "@nestjs/common";
import { AXIOS_PROMISE_INSTANCE_TOKEN } from "./axios.constants";

export class AxiosService {
  constructor(
    @Inject(AXIOS_PROMISE_INSTANCE_TOKEN)
    protected readonly instance: AxiosInstance = Axios,
  ) {}

  get axios(): AxiosInstance {
    return this.instance;
  }

  get interceptors() {
    return this.instance.interceptors;
  }

  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.request<T, R, D>(config);
  }

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.get<T, R, D>(url, config);
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.delete<T, R, D>(url, config);
  }

  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.head<T, R, D>(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.post<T, R, D>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.put<T, R, D>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.patch<T, R, D>(url, data, config);
  }
}
