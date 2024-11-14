// artista/artista.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ArtistasService } from "./artistas.service";
import { Artista } from "./artista.entity";
import { CreateArtistaDto, UpdateArtistaDto } from "./artista.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("artista")
export class ArtistasController {
    constructor(private readonly artistaService: ArtistasService) {}

    @Get()
    findAll(): Promise<Artista[]> {
        return this.artistaService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number): Promise<Artista> {
        return this.artistaService.findOne(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads/artistas",
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `artista-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async create(@Body() createArtistaDto: CreateArtistaDto, @UploadedFile() file: Express.Multer.File): Promise<Artista> {
        return this.artistaService.create({
            ...createArtistaDto,
            imagen: file.filename,
        });
    }

    @Patch(":id")
    async update(@Param("id") id: number, @Body() updateArtistaDto: UpdateArtistaDto): Promise<Artista> {
        return this.artistaService.update(id, updateArtistaDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: number): Promise<void> {
        return this.artistaService.remove(id);
    }
}
