"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const generos_service_1 = require("./generos.service");
const generos_controller_1 = require("./generos.controller");
const genero_entity_1 = require("./genero.entity");
const artista_entity_1 = require("../artistas/artista.entity");
let GenerosModule = class GenerosModule {
};
exports.GenerosModule = GenerosModule;
exports.GenerosModule = GenerosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([genero_entity_1.Genero, artista_entity_1.Artista])],
        controllers: [generos_controller_1.GeneroController],
        providers: [generos_service_1.GenerosService],
        exports: [typeorm_1.TypeOrmModule, generos_service_1.GenerosService],
    })
], GenerosModule);
//# sourceMappingURL=generos.module.js.map