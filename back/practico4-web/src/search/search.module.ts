import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { GenerosModule } from "../generos/generos.module"; // Importa el módulo aquí
import { ArtistasModule } from "../artistas/artistas.module";
import { AlbunModule } from "../albun/albun.module";
import { CancionesModule } from "../canciones/canciones.module";

@Module({
    imports: [GenerosModule, ArtistasModule, AlbunModule, CancionesModule],
    controllers: [SearchController],
})
export class SearchModule {}
