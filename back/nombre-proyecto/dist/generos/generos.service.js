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
exports.GenerosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genero_entity_1 = require("./genero.entity");
const artista_entity_1 = require("../artistas/artista.entity");
let GenerosService = class GenerosService {
    constructor(generoRepository, artistaRepository) {
        this.generoRepository = generoRepository;
        this.artistaRepository = artistaRepository;
    }
    findAll() {
        return this.generoRepository.find();
    }
    async findByName(query) {
        return this.generoRepository.find({
            where: { nombre: (0, typeorm_2.Like)(`%${query}%`) },
        });
    }
    findOne(id) {
        return this.generoRepository.findOneBy({ id });
    }
    async findArtistasByGenero(id) {
        return this.artistaRepository.find({
            where: { genero: { id } },
            relations: ["genero"],
        });
    }
    async findArtistasPorGenero(id) {
        const genero = await this.generoRepository.findOne({
            where: { id },
            relations: ["artistas"],
        });
        if (!genero) {
            throw new common_1.NotFoundException(`Género con ID ${id} no encontrado`);
        }
        return genero.artistas;
    }
    create(genero) {
        const newGenero = this.generoRepository.create(genero);
        return this.generoRepository.save(newGenero);
    }
    async update(id, genero) {
        await this.generoRepository.update(id, genero);
        return this.findOne(id);
    }
    async remove(id) {
        await this.generoRepository.delete(id);
    }
};
exports.GenerosService = GenerosService;
exports.GenerosService = GenerosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genero_entity_1.Genero)),
    __param(1, (0, typeorm_1.InjectRepository)(artista_entity_1.Artista)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GenerosService);
//# sourceMappingURL=generos.service.js.map