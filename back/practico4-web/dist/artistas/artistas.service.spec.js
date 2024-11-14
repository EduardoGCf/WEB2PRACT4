"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const artistas_service_1 = require("./artistas.service");
describe("ArtistasService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [artistas_service_1.ArtistasService],
        }).compile();
        service = module.get(artistas_service_1.ArtistasService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=artistas.service.spec.js.map