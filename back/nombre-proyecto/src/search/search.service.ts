import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Genero } from '../generos/genero.entity';
import { Artista } from '../artistas/artista.entity';
import { Albun } from '../albun/albun.entity';
import { Cancion } from '../canciones/cancion.entity';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Genero) private readonly generoRepo: Repository<Genero>,
        @InjectRepository(Artista) private readonly artistaRepo: Repository<Artista>,
        @InjectRepository(Albun) private readonly albunRepo: Repository<Albun>,
        @InjectRepository(Cancion) private readonly cancionRepo: Repository<Cancion>,
    ) {}

    async searchAll(query: string) {
        const generos = await this.generoRepo.find({ where: { nombre: Like(`%${query}%`) } });
        const artistas = await this.artistaRepo.find({ where: { nombre: Like(`%${query}%`) } });
        const albunes = await this.albunRepo.find({ where: { nombre: Like(`%${query}%`) } });
        const canciones = await this.cancionRepo.find({ where: { nombre: Like(`%${query}%`) } });

        return {
            generos,
            artistas,
            albunes,
            canciones,
        };
    }
}
