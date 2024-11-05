# v2.0.0

**Breaking: Axios configuration options must now be nested under a `config` key in module registration to support new features**

Before:

```ts
AxiosModule.register({
  baseURL: "https://example.com",
  ...
})
```

After:

```ts
AxiosModule.register({
  config: {
    baseURL: "https://example.com",
    ...
  },
})
```
