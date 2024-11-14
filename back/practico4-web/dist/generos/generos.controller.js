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
exports.GeneroController = void 0;
const common_1 = require("@nestjs/common");
const generos_service_1 = require("./generos.service");
const genero_dto_1 = require("./genero.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let GeneroController = class GeneroController {
    constructor(generoService) {
        this.generoService = generoService;
    }
    async findAll() {
        const generos = await this.generoService.findAll();
        return generos.map(genero => (Object.assign(Object.assign({}, genero), { imagen: `http://localhost:3000/uploads/${genero.imagen}` })));
    }
    async findArtistasByGenero(id) {
        return this.generoService.findArtistasByGenero(id);
    }
    async findOne(id) {
        const genero = await this.generoService.findOne(id);
        return Object.assign(Object.assign({}, genero), { imagen: `http://localhost:3000/uploads/${genero.imagen}` });
    }
    async create(createGeneroDto, file) {
        return this.generoService.create(Object.assign(Object.assign({}, createGeneroDto), { imagen: file.filename }));
    }
    async update(id, updateGeneroDto, file) {
        const updatedData = Object.assign({}, updateGeneroDto);
        if (file) {
            updatedData.imagen = file.filename;
        }
        return this.generoService.update(id, updatedData);
    }
    async remove(id) {
        return this.generoService.remove(id);
    }
};
exports.GeneroController = GeneroController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id/artistas"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "findArtistasByGenero", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imagen", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `genero-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [genero_dto_1.CreateGeneroDto, Object]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imagen", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `genero-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, genero_dto_1.UpdateGeneroDto, Object]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "remove", null);
exports.GeneroController = GeneroController = __decorate([
    (0, common_1.Controller)("genero"),
    __metadata("design:paramtypes", [generos_service_1.GenerosService])
], GeneroController);
//# sourceMappingURL=generos.controller.js.map