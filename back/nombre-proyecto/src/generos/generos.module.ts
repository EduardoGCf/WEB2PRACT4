import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerosService } from './generos.service';
import { GeneroController } from './generos.controller';
import { Genero } from './genero.entity';
import { Artista } from '../artistas/artista.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Genero, Artista])],
    controllers: [GeneroController],
    providers: [GenerosService],
    exports: [TypeOrmModule, GenerosService],
})
export class GenerosModule {}
