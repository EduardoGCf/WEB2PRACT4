import { Repository } from 'typeorm';
import { Artista } from './artista.entity';
import { Albun } from '../albun/albun.entity';
import { Cancion } from '../canciones/cancion.entity';
import { Genero } from '../generos/genero.entity';
import { CreateArtistaDto, UpdateArtistaDto } from './artista.dto';
export declare class ArtistasService {
    private readonly artistaRepository;
    private readonly albunRepository;
    private readonly cancionRepository;
    private readonly generosRepository;
    constructor(artistaRepository: Repository<Artista>, albunRepository: Repository<Albun>, cancionRepository: Repository<Cancion>, generosRepository: Repository<Genero>);
    findAll(): Promise<Artista[]>;
    findByName(query: string): Promise<Artista[]>;
    findAlbunesByArtista(id: number): Promise<Albun[]>;
    findOne(id: number): Promise<Artista>;
    create(createArtistaDto: CreateArtistaDto): Promise<Artista>;
    update(id: number, updateArtistaDto: UpdateArtistaDto): Promise<Artista>;
    remove(id: number): Promise<void>;
    findAlbumsByArtist(artistaId: number): Promise<Albun[]>;
    findSongsByArtist(artistaId: number): Promise<Cancion[]>;
    findOneWithAlbumsAndSongs(id: number): Promise<Artista>;
}
