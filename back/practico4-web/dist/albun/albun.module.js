"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbunModule = void 0;
const common_1 = require("@nestjs/common");
const albun_service_1 = require("./albun.service");
const albun_controller_1 = require("./albun.controller");
const typeorm_1 = require("@nestjs/typeorm");
const albun_entity_1 = require("./albun.entity");
const artista_entity_1 = require("../artistas/artista.entity");
const artistas_module_1 = require("../artistas/artistas.module");
const cancion_entity_1 = require("../canciones/cancion.entity");
let AlbunModule = class AlbunModule {
};
exports.AlbunModule = AlbunModule;
exports.AlbunModule = AlbunModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([albun_entity_1.Albun, artista_entity_1.Artista, cancion_entity_1.Cancion]), artistas_module_1.ArtistasModule],
        providers: [albun_service_1.AlbunService],
        controllers: [albun_controller_1.AlbunController],
        exports: [typeorm_1.TypeOrmModule, albun_service_1.AlbunService],
    })
], AlbunModule);
//# sourceMappingURL=albun.module.js.map