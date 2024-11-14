import { Module } from '@nestjs/common';
import { AlbunService } from './albun.service';
import { AlbunController } from './albun.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albun } from './albun.entity';
import { Artista } from '../artistas/artista.entity';
import { ArtistasModule } from '../artistas/artistas.module';
import { Cancion } from '../canciones/cancion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Albun, Artista, Cancion]), ArtistasModule],
    providers: [AlbunService],
    controllers: [AlbunController],
    exports: [TypeOrmModule, AlbunService],
})
export class AlbunModule {}
