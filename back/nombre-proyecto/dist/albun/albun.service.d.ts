import { Repository } from "typeorm";
import { Albun } from "./albun.entity";
import { Artista } from "../artistas/artista.entity";
import { CreateAlbunDto, UpdateAlbunDto } from "./albun.dto";
import { Cancion } from "../canciones/cancion.entity";
export declare class AlbunService {
    private readonly albunRepository;
    private readonly artistaRepository;
    private readonly cancionRepository;
    constructor(albunRepository: Repository<Albun>, artistaRepository: Repository<Artista>, cancionRepository: Repository<Cancion>);
    findByName(query: string): Promise<Albun[]>;
    findAll(): Promise<Albun[]>;
    findCancionesByAlbum(id: number): Promise<Cancion[]>;
    findOne(id: number): Promise<Albun>;
    create(createAlbunDto: CreateAlbunDto): Promise<Albun>;
    update(id: number, updateAlbunDto: UpdateAlbunDto): Promise<Albun>;
    remove(id: number): Promise<void>;
}
