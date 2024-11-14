import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistasService } from "./artistas.service";
import { ArtistasController } from "./artistas.controller";
import { Artista } from "./artista.entity";
import { Albun } from "../albun/albun.entity";
import { Cancion } from "../canciones/cancion.entity";
import { GenerosModule } from "../generos/generos.module"; // Importa GenerosModule

@Module({
    imports: [
        TypeOrmModule.forFeature([Artista, Albun, Cancion]),
        GenerosModule, // Importa el módulo para que GeneroRepository esté disponible
    ],
    providers: [ArtistasService],
    controllers: [ArtistasController],
    exports: [TypeOrmModule, ArtistasService],
})
export class ArtistasModule {}