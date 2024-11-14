"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const generos_service_1 = require("../generos/generos.service");
const artistas_service_1 = require("../artistas/artistas.service");
const albun_service_1 = require("../albun/albun.service");
const canciones_service_1 = require("../canciones/canciones.service");
let SearchController = class SearchController {
    constructor(generosService, artistasService, albunService, cancionesService) {
        this.generosService = generosService;
        this.artistasService = artistasService;
        this.albunService = albunService;
        this.cancionesService = cancionesService;
    }
    async search(query) {
        if (!query || query.length < 2) {
            return {
                generos: [],
                artistas: [],
                albunes: [],
                canciones: [],
            };
        }
        const [generos, artistas, albunes, canciones] = await Promise.all([
            this.generosService.findByName(query),
            this.artistasService.findByName(query),
            this.albunService.findByName(query),
            this.cancionesService.findByName(query),
        ]);
        return {
            generos,
            artistas,
            albunes,
            canciones,
        };
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "search", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)("search"),
    __metadata("design:paramtypes", [generos_service_1.GenerosService,
        artistas_service_1.ArtistasService,
        albun_service_1.AlbunService,
        canciones_service_1.CancionesService])
], SearchController);
//# sourceMappingURL=search.controller.js.map