"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const canciones_service_1 = require("./canciones.service");
describe("CancionesService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [canciones_service_1.CancionesService],
        }).compile();
        service = module.get(canciones_service_1.CancionesService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=canciones.service.spec.js.map