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

### Custom Config

```typescript
@Module({
  imports: [
    AxiosModule.register({
      baseURL: "https://example.com",
      headers: {
        "X-My-Header": "Is a value!",
      },
    }),
  ],
})
export class AppModule {}
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

MUCH more preferrable to the nestjs way of using an observable. They're casting their observable to a promise anyways... :facepalm:

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
