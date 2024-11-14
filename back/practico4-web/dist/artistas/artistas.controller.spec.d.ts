import { ArtistasService } from "./artistas.service";
import { Artista } from "./artista.entity";
import { CreateArtistaDto, UpdateArtistaDto } from "./artista.dto";
export declare class ArtistasController {
    private readonly artistaService;
    constructor(artistaService: ArtistasService);
    findAll(): Promise<Artista[]>;
    findOne(id: number): Promise<Artista>;
    create(createArtistaDto: CreateArtistaDto, file: Express.Multer.File): Promise<Artista>;
    update(id: number, updateArtistaDto: UpdateArtistaDto): Promise<Artista>;
    remove(id: number): Promise<void>;
}
