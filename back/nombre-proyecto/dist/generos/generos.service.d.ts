import { Repository } from 'typeorm';
import { Genero } from './genero.entity';
import { Artista } from '../artistas/artista.entity';
export declare class GenerosService {
    private readonly generoRepository;
    private readonly artistaRepository;
    constructor(generoRepository: Repository<Genero>, artistaRepository: Repository<Artista>);
    findAll(): Promise<Genero[]>;
    findByName(query: string): Promise<Genero[]>;
    findOne(id: number): Promise<Genero>;
    findArtistasByGenero(id: number): Promise<Artista[]>;
    findArtistasPorGenero(id: number): Promise<Artista[]>;
    create(genero: Partial<Genero>): Promise<Genero>;
    update(id: number, genero: Partial<Genero>): Promise<Genero>;
    remove(id: number): Promise<void>;
}
