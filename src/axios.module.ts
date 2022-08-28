import { Module } from "@nestjs/common";
import Axios, { AxiosRequestConfig } from "axios";

import { AxiosService } from "./axios.service";
import { AXIOS_PROMISE_INSTANCE_TOKEN } from "./axios.constants";

@Module({
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {
  static register(config: AxiosRequestConfig = {}) {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_PROMISE_INSTANCE_TOKEN,
          useValue: Axios.create(config),
        },
      ],
    };
  }
}
