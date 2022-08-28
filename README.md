# Nest.js Axios Promise

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/jasonraimondi/nestjs-axios-promise/unit_tests?label=Unit%20Tests&style=flat-square)](https://github.com/jasonraimondi/nestjs-axios-promise)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/jasonraimondi/typescript-oauth2-server?style=flat-square)](https://codeclimate.com/github/jasonraimondi/typescript-oauth2-server/test_coverage)
[![Maintainability](https://img.shields.io/codeclimate/coverage-letter/jasonraimondi/typescript-oauth2-server?label=maintainability&style=flat-square)](https://codeclimate.com/github/jasonraimondi/typescript-oauth2-server/maintainability)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/jasonraimondi/nestjs-axios-promise?style=flat-square)](https://github.com/jasonraimondi/nestjs-axios-promise/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dt/@jmondi/oauth2-server?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/@jmondi/oauth2-server)

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
