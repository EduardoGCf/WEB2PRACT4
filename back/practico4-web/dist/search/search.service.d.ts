import { Repository } from "typeorm";
import { Genero } from "../generos/genero.entity";
import { Artista } from "../artistas/artista.entity";
import { Albun } from "../albun/albun.entity";
import { Cancion } from "../canciones/cancion.entity";
export declare class SearchService {
    private readonly generoRepo;
    private readonly artistaRepo;
    private readonly albunRepo;
    private readonly cancionRepo;
    constructor(generoRepo: Repository<Genero>, artistaRepo: Repository<Artista>, albunRepo: Repository<Albun>, cancionRepo: Repository<Cancion>);
    searchAll(query: string): Promise<{
        generos: Genero[];
        artistas: Artista[];
        albunes: Albun[];
        canciones: Cancion[];
    }>;
}
