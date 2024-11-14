// generos/generos.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Genero } from "./genero.entity";
import { Artista } from "../artistas/artista.entity";

@Injectable()
export class GenerosService {
    constructor(
        @InjectRepository(Genero)
        private readonly generoRepository: Repository<Genero>,

        @InjectRepository(Artista)
        private readonly artistaRepository: Repository<Artista>,
    ) {}

    findAll(): Promise<Genero[]> {
        return this.generoRepository.find();
    }

    async findByName(query: string): Promise<Genero[]> {
        return this.generoRepository.find({
            where: { nombre: Like(`%${query}%`) },
        });
    }

    findOne(id: number): Promise<Genero> {
        return this.generoRepository.findOneBy({ id });
    }
    async findArtistasByGenero(id: number): Promise<Artista[]> {
        return this.artistaRepository.find({
            where: { genero: { id } }, // Asumiendo relación entre Artista y Genero
            relations: ["genero"],
        });
    }

    async findArtistasPorGenero(id: number): Promise<Artista[]> {
        const genero = await this.generoRepository.findOne({
            where: { id },
            relations: ["artistas"], // Asegúrate de que la relación exista.
        });

        if (!genero) {
            throw new NotFoundException(`Género con ID ${id} no encontrado`);
        }

        return genero.artistas; // Devuelve los artistas asociados a este género.
    }

    create(genero: Partial<Genero>): Promise<Genero> {
        const newGenero = this.generoRepository.create(genero);
        return this.generoRepository.save(newGenero);
    }

    async update(id: number, genero: Partial<Genero>): Promise<Genero> {
        await this.generoRepository.update(id, genero);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.generoRepository.delete(id);
    }
}
