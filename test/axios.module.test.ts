import { Test } from "@nestjs/testing";

import { AxiosModule, AxiosService } from "../src";

describe(AxiosModule, () => {
  let axiosService: AxiosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AxiosModule.register({})],
    }).compile();

    axiosService = moduleRef.get<AxiosService>(AxiosService);
  });

  it("axios module export service", () => {
    expect(axiosService).toBeDefined();
  });
});
