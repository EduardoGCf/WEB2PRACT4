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
exports.AlbunController = void 0;
const common_1 = require("@nestjs/common");
const albun_service_1 = require("./albun.service");
const albun_dto_1 = require("./albun.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let AlbunController = class AlbunController {
    constructor(albunService) {
        this.albunService = albunService;
    }
    async findAll() {
        const albunes = await this.albunService.findAll();
        return albunes.map(albun => (Object.assign(Object.assign({}, albun), { imagen: `http://localhost:3000/uploads/${albun.imagen}` })));
    }
    async findCancionesByAlbum(id) {
        const canciones = await this.albunService.findCancionesByAlbum(id);
        return canciones.map(cancion => ({
            id: cancion.id,
            nombre: cancion.nombre,
            imagen: `http://127.0.0.1:3000/uploads/canciones/${cancion.imagen}`,
            cancion_mp3: `http://127.0.0.1:3000/uploads/${cancion.cancion_mp3}`,
        }));
    }
    async findOne(id) {
        const albun = await this.albunService.findOne(id);
        return Object.assign(Object.assign({}, albun), { imagen: `http://localhost:3000/uploads/${albun.imagen}` });
    }
    async create(createAlbunDto, file) {
        return this.albunService.create(Object.assign(Object.assign({}, createAlbunDto), { imagen: file.filename }));
    }
    async update(id, updateAlbunDto, file) {
        if (file) {
            updateAlbunDto.imagen = file.filename;
        }
        const hasUpdates = Object.keys(updateAlbunDto).length > 0;
        if (!hasUpdates) {
            throw new common_1.BadRequestException("No hay datos válidos para actualizar.");
        }
        return this.albunService.update(id, updateAlbunDto);
    }
    async remove(id) {
        return this.albunService.remove(id);
    }
};
exports.AlbunController = AlbunController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbunController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id/canciones"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbunController.prototype, "findCancionesByAlbum", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbunController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imagen", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `albun-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [albun_dto_1.CreateAlbunDto, Object]),
    __metadata("design:returntype", Promise)
], AlbunController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imagen", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `albun-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, albun_dto_1.UpdateAlbunDto, Object]),
    __metadata("design:returntype", Promise)
], AlbunController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbunController.prototype, "remove", null);
exports.AlbunController = AlbunController = __decorate([
    (0, common_1.Controller)("albunes"),
    __metadata("design:paramtypes", [albun_service_1.AlbunService])
], AlbunController);
//# sourceMappingURL=albun.controller.js.map