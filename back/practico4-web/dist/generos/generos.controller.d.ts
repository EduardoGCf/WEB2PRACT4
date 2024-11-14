import { GenerosService } from "./generos.service";
import { Genero } from "./genero.entity";
import { CreateGeneroDto, UpdateGeneroDto } from "./genero.dto";
import { Artista } from "../artistas/artista.entity";
export declare class GeneroController {
    private readonly generoService;
    constructor(generoService: GenerosService);
    findAll(): Promise<Partial<Genero>[]>;
    findArtistasByGenero(id: number): Promise<Artista[]>;
    findOne(id: number): Promise<Partial<Genero>>;
    create(createGeneroDto: CreateGeneroDto, file: Express.Multer.File): Promise<Genero>;
    update(id: number, updateGeneroDto: UpdateGeneroDto, file?: Express.Multer.File): Promise<Genero>;
    remove(id: number): Promise<void>;
}
