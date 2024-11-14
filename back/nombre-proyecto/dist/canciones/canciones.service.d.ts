import { Repository } from 'typeorm';
import { Cancion } from './cancion.entity';
import { Albun } from '../albun/albun.entity';
import { CreateCancionDto, UpdateCancionDto } from './cancion.dto';
export declare class CancionesService {
    private readonly cancionRepository;
    private readonly albunRepository;
    constructor(cancionRepository: Repository<Cancion>, albunRepository: Repository<Albun>);
    findAll(): Promise<Cancion[]>;
    findByName(query: string): Promise<Cancion[]>;
    findOne(id: number, relations?: string[]): Promise<Cancion>;
    create(cancionData: CreateCancionDto): Promise<Cancion>;
    update(id: number, updateCancionDto: UpdateCancionDto): Promise<Cancion>;
    remove(id: number): Promise<void>;
}
