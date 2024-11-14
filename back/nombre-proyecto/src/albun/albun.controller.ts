import { Controller, Get, Post, Body, Param, Patch, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { AlbunService } from './albun.service';
import { Albun } from './albun.entity';
import { CreateAlbunDto, UpdateAlbunDto } from './albun.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('albunes')
export class AlbunController {
    constructor(private readonly albunService: AlbunService) {}

    @Get()
    async findAll(): Promise<Partial<Albun>[]> {
        const albunes = await this.albunService.findAll();
        return albunes.map(albun => ({
            ...albun,
            imagen: `http://localhost:3000/uploads/${albun.imagen}`,
        }));
    }

    @Get(':id/canciones')
    async findCancionesByAlbum(@Param('id') id: number) {
        const canciones = await this.albunService.findCancionesByAlbum(id);
        return canciones.map(cancion => ({
            id: cancion.id,
            nombre: cancion.nombre,
            imagen: `http://127.0.0.1:3000/uploads/canciones/${cancion.imagen}`,
            cancion_mp3: `http://127.0.0.1:3000/uploads/${cancion.cancion_mp3}`,
        }));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Partial<Albun>> {
        const albun = await this.albunService.findOne(id);
        return {
            ...albun,
            imagen: `http://localhost:3000/uploads/${albun.imagen}`,
        };
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('imagen', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `albun-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async create(@Body() createAlbunDto: CreateAlbunDto, @UploadedFile() file: Express.Multer.File): Promise<Albun> {
        return this.albunService.create({
            ...createAlbunDto,
            imagen: file.filename,
        });
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('imagen', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `albun-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async update(@Param('id') id: number, @Body() updateAlbunDto: UpdateAlbunDto, @UploadedFile() file?: Express.Multer.File) {
        if (file) {
            updateAlbunDto.imagen = file.filename;
        }

        const hasUpdates = Object.keys(updateAlbunDto).length > 0;
        if (!hasUpdates) {
            throw new BadRequestException('No hay datos válidos para actualizar.');
        }

        return this.albunService.update(id, updateAlbunDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.albunService.remove(id);
    }
}
