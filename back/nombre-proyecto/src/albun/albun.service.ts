import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Albun } from './albun.entity';
import { NotFoundException } from '@nestjs/common';
import { Artista } from '../artistas/artista.entity';
import { CreateAlbunDto, UpdateAlbunDto } from './albun.dto';
import { Cancion } from '../canciones/cancion.entity';

@Injectable()
export class AlbunService {
    constructor(
        @InjectRepository(Albun)
        private readonly albunRepository: Repository<Albun>,
        @InjectRepository(Artista)
        private readonly artistaRepository: Repository<Artista>,
        @InjectRepository(Cancion)
        private readonly cancionRepository: Repository<Cancion>,
    ) {}

    async findByName(query: string) {
        return this.albunRepository.find({
            where: { nombre: ILike(`%${query}%`) },
            relations: ['artista'],
        });
    }

    findAll(): Promise<Albun[]> {
        return this.albunRepository.find({ relations: ['artista'] });
    }
    async findCancionesByAlbum(id: number): Promise<Cancion[]> {
        const album = await this.albunRepository.findOne({
            where: { id },
            relations: ['canciones'],
        });

        if (!album) {
            throw new NotFoundException('Álbum no encontrado');
        }

        return album.canciones;
    }

    findOne(id: number): Promise<Albun> {
        return this.albunRepository.findOne({
            where: { id },
            relations: ['artista'],
        });
    }

    async create(createAlbunDto: CreateAlbunDto): Promise<Albun> {
        const artista = await this.artistaRepository.findOne({
            where: { id: createAlbunDto.id_artista },
        });

        if (!artista) {
            throw new NotFoundException(`Artista con ID ${createAlbunDto.id_artista} no encontrado`);
        }

        const albun = this.albunRepository.create({
            ...createAlbunDto,
            artista,
        });

        return this.albunRepository.save(albun);
    }

    async update(id: number, updateAlbunDto: UpdateAlbunDto): Promise<Albun> {
        const albun = await this.albunRepository.findOne({
            where: { id },
            relations: ['artista'],
        });

        if (!albun) {
            throw new NotFoundException(`Álbum con ID ${id} no encontrado`);
        }

        if (updateAlbunDto.id_artista) {
            const artista = await this.artistaRepository.findOne({
                where: { id: updateAlbunDto.id_artista },
            });

            if (!artista) {
                throw new NotFoundException(`Artista con ID ${updateAlbunDto.id_artista} no encontrado`);
            }

            albun.artista = artista;
        }

        Object.assign(albun, updateAlbunDto);

        return this.albunRepository.save(albun);
    }

    async remove(id: number): Promise<void> {
        await this.albunRepository.delete(id);
    }
}
