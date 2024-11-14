"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const search_controller_1 = require("./search.controller");
const generos_module_1 = require("../generos/generos.module");
const artistas_module_1 = require("../artistas/artistas.module");
const albun_module_1 = require("../albun/albun.module");
const canciones_module_1 = require("../canciones/canciones.module");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [generos_module_1.GenerosModule, artistas_module_1.ArtistasModule, albun_module_1.AlbunModule, canciones_module_1.CancionesModule],
        controllers: [search_controller_1.SearchController],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map