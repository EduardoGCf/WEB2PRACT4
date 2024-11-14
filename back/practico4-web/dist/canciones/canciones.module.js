"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancionesModule = void 0;
const common_1 = require("@nestjs/common");
const canciones_service_1 = require("./canciones.service");
const canciones_controller_1 = require("./canciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cancion_entity_1 = require("./cancion.entity");
const albun_entity_1 = require("../albun/albun.entity");
const albun_module_1 = require("../albun/albun.module");
let CancionesModule = class CancionesModule {
};
exports.CancionesModule = CancionesModule;
exports.CancionesModule = CancionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cancion_entity_1.Cancion, albun_entity_1.Albun]), albun_module_1.AlbunModule],
        providers: [canciones_service_1.CancionesService],
        controllers: [canciones_controller_1.CancionesController],
        exports: [typeorm_1.TypeOrmModule, canciones_service_1.CancionesService],
    })
], CancionesModule);
//# sourceMappingURL=canciones.module.js.map