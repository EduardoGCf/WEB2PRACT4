import { Controller, Get, Post, Body, Param, Patch, Delete, Res, UseInterceptors, BadRequestException, UploadedFiles } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { Cancion } from './cancion.entity';
import { CreateCancionDto, UpdateCancionDto } from './cancion.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { join } from 'path';
import { Response } from 'express';

@Controller('canciones')
export class CancionesController {
    constructor(private readonly cancionesService: CancionesService) {}

    @Get()
    async findAll(): Promise<Partial<Cancion>[]> {
        const canciones = await this.cancionesService.findAll();
        return canciones.map(cancion => ({
            ...cancion,
            imagen: `http://localhost:3000/uploads/${cancion.imagen}`,
        }));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Partial<Cancion>> {
        const cancion = await this.cancionesService.findOne(id, ['albun', 'albun.artista']);

        return {
            ...cancion,
            imagen: `http://localhost:3000/uploads/${cancion.imagen}`,
            cancion_mp3: `http://localhost:3000/uploads/${cancion.cancion_mp3}`,
        };
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('files', 2, {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async create(@Body() createCancionDto: CreateCancionDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        const imagenFile = files.find(file => file.mimetype.startsWith('image/'));
        const mp3File = files.find(file => file.mimetype.startsWith('audio/'));

        if (!imagenFile || !mp3File) {
            throw new BadRequestException('Ambos archivos son necesarios');
        }

        return this.cancionesService.create({
            ...createCancionDto,
            imagen: imagenFile.filename,
            cancion_mp3: mp3File.filename,
        });
    }

    @Patch(':id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'imagen', maxCount: 1 },
                { name: 'cancion_mp3', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: './uploads',
                    filename: (req, file, callback) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = extname(file.originalname);
                        callback(null, `files-${uniqueSuffix}${ext}`);
                    },
                }),
            },
        ),
    )
    async update(
        @Param('id') id: number,
        @Body() updateCancionDto: UpdateCancionDto,
        @UploadedFiles()
        files?: {
            imagen?: Express.Multer.File[];
            cancion_mp3?: Express.Multer.File[];
        },
    ): Promise<Cancion> {
        if (files?.imagen) {
            updateCancionDto.imagen = files.imagen[0].filename;
        }

        if (files?.cancion_mp3) {
            updateCancionDto.cancion_mp3 = files.cancion_mp3[0].filename;
        }

        const hasUpdates = Object.keys(updateCancionDto).length > 0;
        if (!hasUpdates) {
            throw new BadRequestException('No hay datos válidos para actualizar.');
        }

        return this.cancionesService.update(id, updateCancionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.cancionesService.remove(id);
    }

    @Get('canciones/:id/mp3')
    async getSongMp3(@Param('id') id: number, @Res() res: Response) {
        const song = await this.cancionesService.findOne(id);
        const filePath = join(__dirname, './uploads', song.cancion_mp3);
        return res.sendFile(filePath);
    }
}
