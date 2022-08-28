# Nest.js Axios Promise

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jasonraimondi/nestjs-axios-promise/nodejs?label=Unit%20Tests&style=flat-square)](https://github.com/jasonraimondi/nestjs-axios-promise)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/jasonraimondi/nestjs-axios-promise?style=flat-square)](https://codeclimate.com/github/jasonraimondi/nestjs-axios-promise/test_coverage)
[![Maintainability](https://img.shields.io/codeclimate/coverage-letter/jasonraimondi/nestjs-axios-promise?label=maintainability&style=flat-square)](https://codeclimate.com/github/jasonraimondi/nestjs-axios-promise/maintainability)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/jasonraimondi/nestjs-axios-promise?style=flat-square)](https://github.com/jasonraimondi/nestjs-axios-promise/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dt/nestjs-axios-promise?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/nestjs-axios-promise)

A Promise based [Axios](https://github.com/axios/axios) module for [Nest.js](https://github.com/nestjs/nest).

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
