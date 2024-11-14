"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const albun_controller_1 = require("./albun.controller");
describe("AlbunController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [albun_controller_1.AlbunController],
        }).compile();
        controller = module.get(albun_controller_1.AlbunController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=albun.controller.spec.js.map