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
exports.CancionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cancion_entity_1 = require("./cancion.entity");
const common_2 = require("@nestjs/common");
const albun_entity_1 = require("../albun/albun.entity");
let CancionesService = class CancionesService {
    constructor(cancionRepository, albunRepository) {
        this.cancionRepository = cancionRepository;
        this.albunRepository = albunRepository;
    }
    findAll() {
        return this.cancionRepository.find({ relations: ['albun'] });
    }
    async findByName(query) {
        return this.cancionRepository.find({
            where: { nombre: (0, typeorm_2.ILike)(`%${query}%`) },
            relations: ['albun', 'albun.artista'],
        });
    }
    async findOne(id, relations = []) {
        const cancion = await this.cancionRepository.findOne({
            where: { id },
            relations,
        });
        if (!cancion) {
            throw new common_2.NotFoundException(`Canción con ID ${id} no encontrada`);
        }
        return cancion;
    }
    async create(cancionData) {
        const newCancion = this.cancionRepository.create({
            ...cancionData,
            albun: { id: cancionData.id_albun },
        });
        return this.cancionRepository.save(newCancion);
    }
    async update(id, updateCancionDto) {
        const cancion = await this.cancionRepository.findOne({
            where: { id },
            relations: ['albun'],
        });
        if (!cancion) {
            throw new common_2.NotFoundException(`Canción con ID ${id} no encontrada`);
        }
        if (updateCancionDto.id_albun) {
            const albun = await this.albunRepository.findOne({
                where: { id: updateCancionDto.id_albun },
            });
            if (!albun) {
                throw new common_2.NotFoundException(`Álbum con ID ${updateCancionDto.id_albun} no encontrado`);
            }
            cancion.albun = albun;
        }
        Object.assign(cancion, updateCancionDto);
        return this.cancionRepository.save(cancion);
    }
    async remove(id) {
        await this.cancionRepository.delete(id);
    }
};
exports.CancionesService = CancionesService;
exports.CancionesService = CancionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cancion_entity_1.Cancion)),
    __param(1, (0, typeorm_1.InjectRepository)(albun_entity_1.Albun)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CancionesService);
//# sourceMappingURL=canciones.service.js.map