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
exports.AlbunService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const albun_entity_1 = require("./albun.entity");
const common_2 = require("@nestjs/common");
const artista_entity_1 = require("../artistas/artista.entity");
const cancion_entity_1 = require("../canciones/cancion.entity");
let AlbunService = class AlbunService {
    constructor(albunRepository, artistaRepository, cancionRepository) {
        this.albunRepository = albunRepository;
        this.artistaRepository = artistaRepository;
        this.cancionRepository = cancionRepository;
    }
    async findByName(query) {
        return this.albunRepository.find({
            where: { nombre: (0, typeorm_2.ILike)(`%${query}%`) },
            relations: ["artista"],
        });
    }
    findAll() {
        return this.albunRepository.find({ relations: ["artista"] });
    }
    async findCancionesByAlbum(id) {
        const album = await this.albunRepository.findOne({
            where: { id },
            relations: ["canciones"],
        });
        if (!album) {
            throw new common_2.NotFoundException("Álbum no encontrado");
        }
        return album.canciones;
    }
    findOne(id) {
        return this.albunRepository.findOne({
            where: { id },
            relations: ["artista"],
        });
    }
    async create(createAlbunDto) {
        const artista = await this.artistaRepository.findOne({
            where: { id: createAlbunDto.id_artista },
        });
        if (!artista) {
            throw new common_2.NotFoundException(`Artista con ID ${createAlbunDto.id_artista} no encontrado`);
        }
        const albun = this.albunRepository.create({
            ...createAlbunDto,
            artista,
        });
        return this.albunRepository.save(albun);
    }
    async update(id, updateAlbunDto) {
        const albun = await this.albunRepository.findOne({
            where: { id },
            relations: ["artista"],
        });
        if (!albun) {
            throw new common_2.NotFoundException(`Álbum con ID ${id} no encontrado`);
        }
        if (updateAlbunDto.id_artista) {
            const artista = await this.artistaRepository.findOne({
                where: { id: updateAlbunDto.id_artista },
            });
            if (!artista) {
                throw new common_2.NotFoundException(`Artista con ID ${updateAlbunDto.id_artista} no encontrado`);
            }
            albun.artista = artista;
        }
        Object.assign(albun, updateAlbunDto);
        return this.albunRepository.save(albun);
    }
    async remove(id) {
        await this.albunRepository.delete(id);
    }
};
exports.AlbunService = AlbunService;
exports.AlbunService = AlbunService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(albun_entity_1.Albun)),
    __param(1, (0, typeorm_1.InjectRepository)(artista_entity_1.Artista)),
    __param(2, (0, typeorm_1.InjectRepository)(cancion_entity_1.Cancion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AlbunService);
//# sourceMappingURL=albun.service.js.map