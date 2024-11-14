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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genero_entity_1 = require("../generos/genero.entity");
const artista_entity_1 = require("../artistas/artista.entity");
const albun_entity_1 = require("../albun/albun.entity");
const cancion_entity_1 = require("../canciones/cancion.entity");
let SearchService = class SearchService {
    constructor(generoRepo, artistaRepo, albunRepo, cancionRepo) {
        this.generoRepo = generoRepo;
        this.artistaRepo = artistaRepo;
        this.albunRepo = albunRepo;
        this.cancionRepo = cancionRepo;
    }
    async searchAll(query) {
        const generos = await this.generoRepo.find({ where: { nombre: (0, typeorm_2.Like)(`%${query}%`) } });
        const artistas = await this.artistaRepo.find({ where: { nombre: (0, typeorm_2.Like)(`%${query}%`) } });
        const albunes = await this.albunRepo.find({ where: { nombre: (0, typeorm_2.Like)(`%${query}%`) } });
        const canciones = await this.cancionRepo.find({ where: { nombre: (0, typeorm_2.Like)(`%${query}%`) } });
        return {
            generos,
            artistas,
            albunes,
            canciones,
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genero_entity_1.Genero)),
    __param(1, (0, typeorm_1.InjectRepository)(artista_entity_1.Artista)),
    __param(2, (0, typeorm_1.InjectRepository)(albun_entity_1.Albun)),
    __param(3, (0, typeorm_1.InjectRepository)(cancion_entity_1.Cancion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map