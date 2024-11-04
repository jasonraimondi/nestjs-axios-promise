import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import {
  create,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosInterceptorOptions,
  type InternalAxiosRequestConfig,
} from "axios";

import { AxiosService } from "./axios.service";
import { AXIOS_PROMISE_INSTANCE_TOKEN } from "./axios.constants";

type AxiosModuleOptions = {
  config?: AxiosRequestConfig;
  interceptors?: {
    response?: {
      onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
      onRejected?: (error: any) => any;
      options?: AxiosInterceptorOptions;
    };
    request?: {
      onFulfilled?: (
        value: InternalAxiosRequestConfig,
      ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
      onRejected?: (error: any) => any;
      options?: AxiosInterceptorOptions;
    };
  };
};

const { ConfigurableModuleClass, OPTIONS_TYPE, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AxiosModuleOptions>().build();

@Module({
  providers: [
    AxiosService,
    {
      provide: AXIOS_PROMISE_INSTANCE_TOKEN,
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: typeof OPTIONS_TYPE = {}) => {
        const axiosInstance = create(options.config ?? {});

        if (options.interceptors?.request) {
          axiosInstance.interceptors.request.use(
            options.interceptors.request.onFulfilled,
            options.interceptors.request.onRejected,
            options.interceptors.request.options,
          );
        }

        if (options.interceptors?.response) {
          axiosInstance.interceptors.response.use(
            options.interceptors.response.onFulfilled,
            options.interceptors.response.onRejected,
            options.interceptors.response.options,
          );
        }

        return axiosInstance;
      },
    },
  ],
  exports: [AxiosService],
})
export class AxiosModule extends ConfigurableModuleClass {}
