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
exports.Albun = void 0;
const typeorm_1 = require("typeorm");
const artista_entity_1 = require("../artistas/artista.entity");
const cancion_entity_1 = require("../canciones/cancion.entity");
let Albun = class Albun {
};
exports.Albun = Albun;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Albun.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Albun.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Albun.prototype, "imagen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artista_entity_1.Artista, artista => artista.albunes, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_artista' }),
    __metadata("design:type", artista_entity_1.Artista)
], Albun.prototype, "artista", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cancion_entity_1.Cancion, cancion => cancion.albun, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Albun.prototype, "canciones", void 0);
exports.Albun = Albun = __decorate([
    (0, typeorm_1.Entity)('albun')
], Albun);
//# sourceMappingURL=albun.entity.js.map