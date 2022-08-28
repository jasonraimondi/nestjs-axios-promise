import { Test } from "@nestjs/testing";
import Axios, { AxiosInstance } from "axios";

import { AXIOS_PROMISE_INSTANCE_TOKEN, AxiosService } from "../src";


describe(AxiosService, () => {
  const MOCK_RESPONSE = "MOCK_RESPONSE";

  let axiosService: AxiosService;
  let axiosInstance: AxiosInstance;

  beforeEach(async () => {
    axiosInstance = Axios.create();

    const moduleRef = await Test.createTestingModule({
      providers: [
        AxiosService,
        {
          provide: AXIOS_PROMISE_INSTANCE_TOKEN,
          useValue: axiosInstance,
        },
      ],
    }).compile();

    axiosService = await moduleRef.get(AxiosService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("is defined", () => {
    expect(axiosService).toBeDefined();
  });

  it("#request", async () => {
    const spy = jest.spyOn(axiosInstance, "request").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.request({});
    expect(spy).toHaveBeenCalledWith({});
    expect(response).toBe(MOCK_RESPONSE);
  });

  it("#get", async () => {
    const spy = jest.spyOn(axiosInstance, "get").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.get("/fake_path", {});
    expect(spy).toHaveBeenCalledWith("/fake_path", {});
    expect(response).toBe(MOCK_RESPONSE);
  });

  it("#delete", async () => {
    const spy = jest.spyOn(axiosInstance, "delete").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.delete("/fake_path", {});
    expect(spy).toHaveBeenCalledWith("/fake_path", {});
    expect(response).toBe(MOCK_RESPONSE);
  });

  it("#head", async () => {
    const spy = jest.spyOn(axiosInstance, "head").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.head("/fake_path", {});
    expect(spy).toHaveBeenCalledWith("/fake_path", {});
    expect(response).toBe(MOCK_RESPONSE);
  });

  it("#post", async () => {
    const spy = jest.spyOn(axiosInstance, "post").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.post("/fake_path", { body: "string" }, {});
    expect(spy).toHaveBeenCalledWith("/fake_path", { body: "string" }, {});
    expect(response).toBe(MOCK_RESPONSE);
  });

  it("#patch", async () => {
    const spy = jest.spyOn(axiosInstance, "patch").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.patch("/fake_path", { body: "string" }, {});
    expect(spy).toHaveBeenCalledWith("/fake_path", { body: "string" }, {});
    expect(response).toBe(MOCK_RESPONSE);
  });

  it("#put", async () => {
    const spy = jest.spyOn(axiosInstance, "put").mockImplementation(async () => MOCK_RESPONSE);
    const response = await axiosService.put("/fake_path", { body: "string" }, {});
    expect(spy).toHaveBeenCalledWith("/fake_path", { body: "string" }, {});
    expect(response).toBe(MOCK_RESPONSE);
  });
});
