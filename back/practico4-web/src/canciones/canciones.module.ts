import { Module } from "@nestjs/common";
import { CancionesService } from "./canciones.service";
import { CancionesController } from "./canciones.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cancion } from "./cancion.entity";
import { Albun } from "../albun/albun.entity";
import { AlbunModule } from "../albun/albun.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cancion, Albun]), AlbunModule],
    providers: [CancionesService],
    controllers: [CancionesController],
    exports: [TypeOrmModule, CancionesService],
})
export class CancionesModule {}
