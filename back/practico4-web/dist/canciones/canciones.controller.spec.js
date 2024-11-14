"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const canciones_controller_1 = require("./canciones.controller");
describe("CancionesController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [canciones_controller_1.CancionesController],
        }).compile();
        controller = module.get(canciones_controller_1.CancionesController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=canciones.controller.spec.js.map