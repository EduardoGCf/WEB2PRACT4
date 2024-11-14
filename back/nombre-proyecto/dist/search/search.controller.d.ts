import { GenerosService } from '../generos/generos.service';
import { ArtistasService } from '../artistas/artistas.service';
import { AlbunService } from '../albun/albun.service';
import { CancionesService } from '../canciones/canciones.service';
export declare class SearchController {
    private readonly generosService;
    private readonly artistasService;
    private readonly albunService;
    private readonly cancionesService;
    constructor(generosService: GenerosService, artistasService: ArtistasService, albunService: AlbunService, cancionesService: CancionesService);
    search(query: string): Promise<{
        generos: import("../generos/genero.entity").Genero[];
        artistas: import("../artistas/artista.entity").Artista[];
        albunes: import("../albun/albun.entity").Albun[];
        canciones: import("../canciones/cancion.entity").Cancion[];
    }>;
}
