"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const albun_service_1 = require("./albun.service");
describe("AlbunService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [albun_service_1.AlbunService],
        }).compile();
        service = module.get(albun_service_1.AlbunService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=albun.service.spec.js.map