"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const artistas_service_1 = require("./artistas.service");
const artistas_controller_1 = require("./artistas.controller");
const artista_entity_1 = require("./artista.entity");
const albun_entity_1 = require("../albun/albun.entity");
const cancion_entity_1 = require("../canciones/cancion.entity");
const generos_module_1 = require("../generos/generos.module");
let ArtistasModule = class ArtistasModule {
};
exports.ArtistasModule = ArtistasModule;
exports.ArtistasModule = ArtistasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([artista_entity_1.Artista, albun_entity_1.Albun, cancion_entity_1.Cancion]),
            generos_module_1.GenerosModule,
        ],
        providers: [artistas_service_1.ArtistasService],
        controllers: [artistas_controller_1.ArtistasController],
        exports: [typeorm_1.TypeOrmModule, artistas_service_1.ArtistasService],
    })
], ArtistasModule);
//# sourceMappingURL=artistas.module.js.map