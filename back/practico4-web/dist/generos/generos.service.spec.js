"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const generos_service_1 = require("./generos.service");
describe("GeneroService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [generos_service_1.GeneroService],
        }).compile();
        service = module.get(generos_service_1.GeneroService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=generos.service.spec.js.map