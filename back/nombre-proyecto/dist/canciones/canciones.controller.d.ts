import { CancionesService } from './canciones.service';
import { Cancion } from './cancion.entity';
import { CreateCancionDto, UpdateCancionDto } from './cancion.dto';
import { Response } from 'express';
export declare class CancionesController {
    private readonly cancionesService;
    constructor(cancionesService: CancionesService);
    findAll(): Promise<Partial<Cancion>[]>;
    findOne(id: number): Promise<Partial<Cancion>>;
    create(createCancionDto: CreateCancionDto, files: Array<Express.Multer.File>): Promise<Cancion>;
    update(id: number, updateCancionDto: UpdateCancionDto, files?: {
        imagen?: Express.Multer.File[];
        cancion_mp3?: Express.Multer.File[];
    }): Promise<Cancion>;
    remove(id: number): Promise<void>;
    getSongMp3(id: number, res: Response): Promise<void>;
}
