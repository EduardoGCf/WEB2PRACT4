import { Test, TestingModule } from "@nestjs/testing";
import { AlbunService } from "./albun.service";

describe("AlbunService", () => {
    let service: AlbunService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AlbunService],
        }).compile();

        service = module.get<AlbunService>(AlbunService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
