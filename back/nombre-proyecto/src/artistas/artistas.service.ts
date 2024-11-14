import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Artista } from './artista.entity';
import { Albun } from '../albun/albun.entity';
import { Cancion } from '../canciones/cancion.entity';
import { Genero } from '../generos/genero.entity';
import { CreateArtistaDto, UpdateArtistaDto } from './artista.dto';

@Injectable()
export class ArtistasService {
    constructor(
        @InjectRepository(Artista)
        private readonly artistaRepository: Repository<Artista>,

        @InjectRepository(Albun)
        private readonly albunRepository: Repository<Albun>,

        @InjectRepository(Cancion)
        private readonly cancionRepository: Repository<Cancion>,
        @InjectRepository(Genero)
        private readonly generosRepository: Repository<Genero>,
    ) {}

    findAll(): Promise<Artista[]> {
        return this.artistaRepository.find({ relations: ['genero'] });
    }

    async findByName(query: string): Promise<Artista[]> {
        return this.artistaRepository.find({
            where: { nombre: Like(`%${query}%`) },
        });
    }

    async findAlbunesByArtista(id: number): Promise<Albun[]> {
        return this.albunRepository.find({
            where: { artista: { id } },
            relations: ['artista'],
        });
    }

    findOne(id: number): Promise<Artista> {
        return this.artistaRepository.findOne({
            where: { id },
            relations: ['genero'],
        });
    }

    async create(createArtistaDto: CreateArtistaDto): Promise<Artista> {
        const genero = await this.generosRepository.findOne({
            where: { id: createArtistaDto.id_genero },
        });

        if (!genero) {
            throw new NotFoundException(`Género con ID ${createArtistaDto.id_genero} no encontrado`);
        }

        const artista = this.artistaRepository.create({
            ...createArtistaDto,
            genero,
        });

        return this.artistaRepository.save(artista);
    }

    async update(id: number, updateArtistaDto: UpdateArtistaDto): Promise<Artista> {
        const artista = await this.artistaRepository.findOne({ where: { id }, relations: ['genero'] });

        if (!artista) {
            throw new NotFoundException(`Artista con ID ${id} no encontrado`);
        }

        if (updateArtistaDto.id_genero) {
            const genero = await this.generosRepository.findOne({ where: { id: updateArtistaDto.id_genero } });

            if (!genero) {
                throw new NotFoundException(`Género con ID ${updateArtistaDto.id_genero} no encontrado`);
            }

            artista.genero = genero;
        }

        Object.assign(artista, updateArtistaDto);

        return this.artistaRepository.save(artista);
    }

    async remove(id: number): Promise<void> {
        const result = await this.artistaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Artista con ID ${id} no encontrado`);
        }
    }

    async findAlbumsByArtist(artistaId: number): Promise<Albun[]> {
        return this.albunRepository.find({
            where: { artista: { id: artistaId } },
            relations: ['artista'],
        });
    }

    async findSongsByArtist(artistaId: number): Promise<Cancion[]> {
        return this.cancionRepository
            .createQueryBuilder('cancion')
            .innerJoinAndSelect('cancion.albun', 'albun')
            .innerJoinAndSelect('albun.artista', 'artista')
            .where('artista.id = :artistaId', { artistaId })
            .getMany();
    }

    async findOneWithAlbumsAndSongs(id: number): Promise<Artista> {
        return this.artistaRepository.findOne({
            where: { id },
            relations: ['albunes', 'albunes.canciones'],
        });
    }
}
