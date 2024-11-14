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
exports.CancionesController = void 0;
const common_1 = require("@nestjs/common");
const canciones_service_1 = require("./canciones.service");
const cancion_dto_1 = require("./cancion.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const path_2 = require("path");
let CancionesController = class CancionesController {
    constructor(cancionesService) {
        this.cancionesService = cancionesService;
    }
    async findAll() {
        const canciones = await this.cancionesService.findAll();
        return canciones.map((cancion) => (Object.assign(Object.assign({}, cancion), { imagen: `http://localhost:3000/uploads/${cancion.imagen}` })));
    }
    async findOne(id) {
        const cancion = await this.cancionesService.findOne(id, [
            "albun",
            "albun.artista",
        ]);
        return Object.assign(Object.assign({}, cancion), { imagen: `http://localhost:3000/uploads/${cancion.imagen}`, cancion_mp3: `http://localhost:3000/uploads/${cancion.cancion_mp3}` });
    }
    async create(createCancionDto, files) {
        const imagenFile = files.find((file) => file.mimetype.startsWith("image/"));
        const mp3File = files.find((file) => file.mimetype.startsWith("audio/"));
        if (!imagenFile || !mp3File) {
            throw new common_1.BadRequestException("Ambos archivos son necesarios");
        }
        return this.cancionesService.create(Object.assign(Object.assign({}, createCancionDto), { imagen: imagenFile.filename, cancion_mp3: mp3File.filename }));
    }
    async update(id, updateCancionDto, files) {
        if (files === null || files === void 0 ? void 0 : files.imagen) {
            updateCancionDto.imagen = files.imagen[0].filename;
        }
        if (files === null || files === void 0 ? void 0 : files.cancion_mp3) {
            updateCancionDto.cancion_mp3 = files.cancion_mp3[0].filename;
        }
        const hasUpdates = Object.keys(updateCancionDto).length > 0;
        if (!hasUpdates) {
            throw new common_1.BadRequestException("No hay datos válidos para actualizar.");
        }
        return this.cancionesService.update(id, updateCancionDto);
    }
    async remove(id) {
        return this.cancionesService.remove(id);
    }
    async getSongMp3(id, res) {
        const song = await this.cancionesService.findOne(id);
        const filePath = (0, path_2.join)(__dirname, "./uploads", song.cancion_mp3);
        return res.sendFile(filePath);
    }
};
exports.CancionesController = CancionesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CancionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CancionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 2, {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancion_dto_1.CreateCancionDto,
        Array]),
    __metadata("design:returntype", Promise)
], CancionesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "imagen", maxCount: 1 },
        { name: "cancion_mp3", maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `files-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cancion_dto_1.UpdateCancionDto, Object]),
    __metadata("design:returntype", Promise)
], CancionesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CancionesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("canciones/:id/mp3"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CancionesController.prototype, "getSongMp3", null);
exports.CancionesController = CancionesController = __decorate([
    (0, common_1.Controller)("canciones"),
    __metadata("design:paramtypes", [canciones_service_1.CancionesService])
], CancionesController);
//# sourceMappingURL=canciones.controller.js.map