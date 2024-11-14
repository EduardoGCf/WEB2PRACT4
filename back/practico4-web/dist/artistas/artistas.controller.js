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
exports.ArtistasController = void 0;
const common_1 = require("@nestjs/common");
const artistas_service_1 = require("./artistas.service");
const artista_dto_1 = require("./artista.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let ArtistasController = class ArtistasController {
    constructor(artistasService) {
        this.artistasService = artistasService;
    }
    async findAll() {
        const artistas = await this.artistasService.findAll();
        return artistas.map((artista) => (Object.assign(Object.assign({}, artista), { imagen: `http://localhost:3000/uploads/${artista.imagen}` })));
    }
    async findAlbunesByArtista(id) {
        const albunes = await this.artistasService.findAlbunesByArtista(id);
        return albunes.map((albun) => (Object.assign(Object.assign({}, albun), { imagen: albun.imagen
                ? `http://localhost:3000/uploads/${albun.imagen}`
                : `http://localhost:3000/uploads/default.jpg` })));
    }
    async findOne(id) {
        const artista = await this.artistasService.findOne(id);
        if (!artista) {
            throw new common_1.NotFoundException(`Artista con ID ${id} no encontrado`);
        }
        return Object.assign(Object.assign({}, artista), { imagen: artista.imagen
                ? `http://localhost:3000/uploads/${artista.imagen}`
                : null });
    }
    async create(createArtistaDto, file) {
        return this.artistasService.create(Object.assign(Object.assign({}, createArtistaDto), { imagen: file.filename }));
    }
    async update(id, updateArtistaDto, file) {
        if (file) {
            updateArtistaDto.imagen = file.filename;
        }
        const hasUpdates = Object.keys(updateArtistaDto).length > 0;
        if (!hasUpdates) {
            throw new common_1.BadRequestException("No hay datos válidos para actualizar.");
        }
        return this.artistasService.update(id, updateArtistaDto);
    }
    async remove(id) {
        return this.artistasService.remove(id);
    }
    async getAlbumsByArtist(id) {
        return this.artistasService.findAlbumsByArtist(id);
    }
    async getSongsByArtist(id) {
        return this.artistasService.findSongsByArtist(id);
    }
};
exports.ArtistasController = ArtistasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id/albunes"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "findAlbunesByArtista", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imagen", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `artista-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artista_dto_1.CreateArtistaDto, Object]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imagen", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `artista-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, artista_dto_1.UpdateArtistaDto, Object]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("artistas/:id/albunes"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "getAlbumsByArtist", null);
__decorate([
    (0, common_1.Get)("artistas/:id/canciones"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistasController.prototype, "getSongsByArtist", null);
exports.ArtistasController = ArtistasController = __decorate([
    (0, common_1.Controller)("artistas"),
    __metadata("design:paramtypes", [artistas_service_1.ArtistasService])
], ArtistasController);
//# sourceMappingURL=artistas.controller.js.map