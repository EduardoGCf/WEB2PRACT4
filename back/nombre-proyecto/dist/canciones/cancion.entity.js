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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancion = void 0;
const typeorm_1 = require("typeorm");
const albun_entity_1 = require("../albun/albun.entity");
let Cancion = class Cancion {
};
exports.Cancion = Cancion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cancion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Cancion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Cancion.prototype, "cancion_mp3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Cancion.prototype, "imagen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => albun_entity_1.Albun, albun => albun.canciones, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "id_albun" }),
    __metadata("design:type", albun_entity_1.Albun)
], Cancion.prototype, "albun", void 0);
exports.Cancion = Cancion = __decorate([
    (0, typeorm_1.Entity)("cancion")
], Cancion);
//# sourceMappingURL=cancion.entity.js.map