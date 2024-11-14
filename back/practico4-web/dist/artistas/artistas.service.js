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
exports.ArtistasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artista_entity_1 = require("./artista.entity");
const albun_entity_1 = require("../albun/albun.entity");
const cancion_entity_1 = require("../canciones/cancion.entity");
const genero_entity_1 = require("../generos/genero.entity");
let ArtistasService = class ArtistasService {
    constructor(artistaRepository, albunRepository, cancionRepository, generosRepository) {
        this.artistaRepository = artistaRepository;
        this.albunRepository = albunRepository;
        this.cancionRepository = cancionRepository;
        this.generosRepository = generosRepository;
    }
    findAll() {
        return this.artistaRepository.find({ relations: ["genero"] });
    }
    async findByName(query) {
        return this.artistaRepository.find({
            where: { nombre: (0, typeorm_2.Like)(`%${query}%`) },
        });
    }
    async findAlbunesByArtista(id) {
        return this.albunRepository.find({
            where: { artista: { id } },
            relations: ["artista"],
        });
    }
    findOne(id) {
        return this.artistaRepository.findOne({
            where: { id },
            relations: ["genero"],
        });
    }
    async create(createArtistaDto) {
        const genero = await this.generosRepository.findOne({
            where: { id: createArtistaDto.id_genero },
        });
        if (!genero) {
            throw new common_1.NotFoundException(`Género con ID ${createArtistaDto.id_genero} no encontrado`);
        }
        const artista = this.artistaRepository.create(Object.assign(Object.assign({}, createArtistaDto), { genero }));
        return this.artistaRepository.save(artista);
    }
    async update(id, updateArtistaDto) {
        const artista = await this.artistaRepository.findOne({ where: { id }, relations: ["genero"] });
        if (!artista) {
            throw new common_1.NotFoundException(`Artista con ID ${id} no encontrado`);
        }
        if (updateArtistaDto.id_genero) {
            const genero = await this.generosRepository.findOne({ where: { id: updateArtistaDto.id_genero } });
            if (!genero) {
                throw new common_1.NotFoundException(`Género con ID ${updateArtistaDto.id_genero} no encontrado`);
            }
            artista.genero = genero;
        }
        Object.assign(artista, updateArtistaDto);
        return this.artistaRepository.save(artista);
    }
    async remove(id) {
        const result = await this.artistaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Artista con ID ${id} no encontrado`);
        }
    }
    async findAlbumsByArtist(artistaId) {
        return this.albunRepository.find({
            where: { artista: { id: artistaId } },
            relations: ["artista"],
        });
    }
    async findSongsByArtist(artistaId) {
        return this.cancionRepository
            .createQueryBuilder("cancion")
            .innerJoinAndSelect("cancion.albun", "albun")
            .innerJoinAndSelect("albun.artista", "artista")
            .where("artista.id = :artistaId", { artistaId })
            .getMany();
    }
    async findOneWithAlbumsAndSongs(id) {
        return this.artistaRepository.findOne({
            where: { id },
            relations: ["albunes", "albunes.canciones"],
        });
    }
};
exports.ArtistasService = ArtistasService;
exports.ArtistasService = ArtistasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artista_entity_1.Artista)),
    __param(1, (0, typeorm_1.InjectRepository)(albun_entity_1.Albun)),
    __param(2, (0, typeorm_1.InjectRepository)(cancion_entity_1.Cancion)),
    __param(3, (0, typeorm_1.InjectRepository)(genero_entity_1.Genero)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistasService);
//# sourceMappingURL=artistas.service.js.map