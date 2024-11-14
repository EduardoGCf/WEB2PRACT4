"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const generos_controller_1 = require("./generos.controller");
describe("GeneroController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [generos_controller_1.GeneroController],
        }).compile();
        controller = module.get(generos_controller_1.GeneroController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=generos.controller.spec.js.map