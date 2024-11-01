import { Test } from "@nestjs/testing";

import { AxiosModule, AxiosService } from "../src";

describe(AxiosModule, () => {
  it("axios module export service", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AxiosModule.register({})],
    }).compile();

    const axiosService = moduleRef.get<AxiosService>(AxiosService);

    expect(axiosService).toBeDefined();
  });

  it("should allow registering asynchronously", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AxiosModule.registerAsync({
          useFactory: () => {
            return {
              config: {},
            };
          },
        }),
      ],
    }).compile();

    const axiosService = moduleRef.get<AxiosService>(AxiosService);

    expect(axiosService).toBeDefined();
  });

  it("should register interceptors", async () => {
    const responseOnFulfilled = jest.fn();
    const requestOnFulfilled = jest.fn();

    const moduleRef = await Test.createTestingModule({
      imports: [
        AxiosModule.register({
          interceptors: {
            response: {
              onFulfilled: (response) => {
                responseOnFulfilled("response");

                return response;
              },
            },

            request: {
              onFulfilled: (requestConfig) => {
                requestOnFulfilled("request");

                return requestConfig;
              },
            },
          },
        }),
      ],
    }).compile();

    const axiosService = moduleRef.get<AxiosService>(AxiosService);

    await axiosService.get("https://github.com");

    expect(responseOnFulfilled).toHaveBeenCalledTimes(1);
    expect(responseOnFulfilled).toHaveBeenCalledWith("response");

    expect(requestOnFulfilled).toHaveBeenCalledTimes(1);
    expect(requestOnFulfilled).toHaveBeenCalledWith("request");
  });

  it("should async register interceptors", async () => {
    const responseOnFulfilled = jest.fn();
    const requestOnFulfilled = jest.fn();

    const moduleRef = await Test.createTestingModule({
      imports: [
        AxiosModule.registerAsync({
          useFactory: () => ({
            interceptors: {
              response: {
                onFulfilled: (response) => {
                  responseOnFulfilled("response");

                  return response;
                },
              },

              request: {
                onFulfilled: (requestConfig) => {
                  requestOnFulfilled("request");

                  return requestConfig;
                },
              },
            },
          }),
        }),
      ],
    }).compile();

    const axiosService = moduleRef.get<AxiosService>(AxiosService);

    await axiosService.get("https://github.com");

    expect(responseOnFulfilled).toHaveBeenCalledTimes(1);
    expect(responseOnFulfilled).toHaveBeenCalledWith("response");

    expect(requestOnFulfilled).toHaveBeenCalledTimes(1);
    expect(requestOnFulfilled).toHaveBeenCalledWith("request");
  });
});
