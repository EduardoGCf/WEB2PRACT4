import { AlbunService } from "./albun.service";
import { Albun } from "./albun.entity";
import { CreateAlbunDto, UpdateAlbunDto } from "./albun.dto";
export declare class AlbunController {
    private readonly albunService;
    constructor(albunService: AlbunService);
    findAll(): Promise<Partial<Albun>[]>;
    findCancionesByAlbum(id: number): Promise<{
        id: number;
        nombre: string;
        imagen: string;
        cancion_mp3: string;
    }[]>;
    findOne(id: number): Promise<Partial<Albun>>;
    create(createAlbunDto: CreateAlbunDto, file: Express.Multer.File): Promise<Albun>;
    update(id: number, updateAlbunDto: UpdateAlbunDto, file?: Express.Multer.File): Promise<Albun>;
    remove(id: number): Promise<void>;
}
