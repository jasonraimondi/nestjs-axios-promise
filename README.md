# Nest.js Axios Promise

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/allmyfutures/nestjs-axios-promise/nodejs.yml?branch=main&label=Unit%20Tests&style=flat-square)](https://github.com/jasonraimondi/nestjs-axios-promise)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/jasonraimondi/nestjs-axios-promise?style=flat-square)](https://codeclimate.com/github/jasonraimondi/nestjs-axios-promise/test_coverage)
[![Maintainability](https://img.shields.io/codeclimate/coverage-letter/jasonraimondi/nestjs-axios-promise?label=maintainability&style=flat-square)](https://codeclimate.com/github/jasonraimondi/nestjs-axios-promise/maintainability)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/jasonraimondi/nestjs-axios-promise?style=flat-square)](https://github.com/jasonraimondi/nestjs-axios-promise/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dt/nestjs-axios-promise?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/nestjs-axios-promise)

A thin wrapper around [Axios](https://github.com/axios/axios) for [Nest.js](https://github.com/nestjs/nest) using Promises, because the [@nestjs/axios](https://github.com/nestjs/axios) package returns an observable. See [#why](#why)

## Install

```bash
pnpm add nestjs-axios-promise
```

## Usage

```typescript
import { AxiosService } from "./axios.service";

@Module({
  imports: [AxiosModule.register()],
  providers: [MyCustomService],
})
export class AppModule {}
```

```typescript
@Injectable()
export class MyCustomService {
  constructor(private readonly http: AxiosService) {}

  async doWork() {
    const response = await this.http.get("/");
    console.log(response);
  }
}
```

### Custom Axios config

```typescript
@Module({
  imports: [
    AxiosModule.register({
      config: {
        baseURL: "https://example.com",
        headers: {
          "X-My-Header": "Is a value!",
        },
      },
    }),
  ],
})
export class AppModule {}
```

#### Register Axios interceptors

[Axios interceptors](https://axios-http.com/docs/interceptors) can be
configured on Axios clients to intercept requests or responses before they are
handled by `then` or `catch`.

```typescript
import { create } from "axios";

const client = create();

client.interceptors.request.use(
  (request) => {
    return request;
  },
  (err) => {
    return err;
  },
  {},
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return err;
  },
  {},
);
```

However, because NestJS abstracts away the construction of services, including
this library's Axios wrapper which makes registering Axios interceptors
difficult via the usual approach.

To resolve this, this module provides an additional way to configure
interceptors via the module registration configuration:

```typescript
@Module({
  imports: [
    AxiosModule.register({
      interceptors: {
        request: {
          onFulfilled: (requestConfig) => {
            return requestConfig;
          },
          onRejected: (err) => {
            return err;
          },
          options: {},
        },

        response: {
          onFulfilled: (response) => {
            return response;
          },
          onRejected: (err) => {
            return err;
          },
          options: {},
        },
      },
    }),
  ],
})
export class AppModule {}
```

Interceptors can still be modified later via the Axios reference on the
service:

```typescript
import { HttpService } from "nestjs-axios-promise";

@Injectable()
export class CatsService {
  public constructor(private readonly httpService: HttpService) {}

  public doThing() {
    this.httpService.axios.interceptors.request.use((requestConfig) => {
      return requestConfig;
    });
    this.httpService.axios.interceptors.request.eject();
  }
}
```

### Why

Because I find our way using a promise

```ts
import { AxiosService } from "nestjs-axios-promise";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  constructor(private readonly httpService: AxiosService) {}

  findAll(): Promise<Cat[]> {
    const { data } = await this.httpService
      .get<Cat[]>("http://localhost:3000/cats")
      .catch((error: AxiosError) => {
        this.logger.error(error.response.data);
        throw "An error happened!";
      });
    return data;
  }
}
```

MUCH more preferable to the NestJS way of using an observable. They're casting
their observable to a promise anyways... :facepalm:

```ts
import { catchError, firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  constructor(private readonly httpService: HttpService) {}

  findAll(): Promise<Cat[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cat[]>("http://localhost:3000/cats").pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw "An error happened!";
        }),
      ),
    );
    return data;
  }
}
```
