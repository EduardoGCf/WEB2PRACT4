import { ArtistasService } from './artistas.service';
import { Artista } from './artista.entity';
import { CreateArtistaDto, UpdateArtistaDto } from './artista.dto';
export declare class ArtistasController {
    private readonly artistasService;
    constructor(artistasService: ArtistasService);
    findAll(): Promise<Partial<Artista>[]>;
    findAlbunesByArtista(id: number): Promise<{
        imagen: string;
        id: number;
        nombre: string;
        artista: Artista;
        canciones: import("../canciones/cancion.entity").Cancion[];
    }[]>;
    findOne(id: number): Promise<Partial<Artista>>;
    create(createArtistaDto: CreateArtistaDto, file: Express.Multer.File): Promise<Artista>;
    update(id: number, updateArtistaDto: UpdateArtistaDto, file?: Express.Multer.File): Promise<Artista>;
    remove(id: number): Promise<void>;
    getAlbumsByArtist(id: number): Promise<import("../albun/albun.entity").Albun[]>;
    getSongsByArtist(id: number): Promise<import("../canciones/cancion.entity").Cancion[]>;
}
