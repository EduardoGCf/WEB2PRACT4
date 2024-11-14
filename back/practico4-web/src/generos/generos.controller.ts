// genero/genero.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GenerosService } from "./generos.service";
import { Genero } from "./genero.entity";
import { CreateGeneroDto, UpdateGeneroDto } from "./genero.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { Artista } from "../artistas/artista.entity";

@Controller("genero")
export class GeneroController {
    constructor(private readonly generoService: GenerosService) {}

    @Get()
    async findAll(): Promise<Partial<Genero>[]> {
        const generos = await this.generoService.findAll();
        return generos.map(genero => ({
            ...genero,
            imagen: `http://localhost:3000/uploads/${genero.imagen}`, // URL completa
        }));
    }

    @Get(":id/artistas")
    async findArtistasByGenero(@Param("id") id: number): Promise<Artista[]> {
        return this.generoService.findArtistasByGenero(id);
    }

    @Get(":id")
    async findOne(@Param("id") id: number): Promise<Partial<Genero>> {
        const genero = await this.generoService.findOne(id);
        return {
            ...genero,
            imagen: `http://localhost:3000/uploads/${genero.imagen}`, // URL completa
        };
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `genero-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async create(@Body() createGeneroDto: CreateGeneroDto, @UploadedFile() file: Express.Multer.File): Promise<Genero> {
        return this.generoService.create({
            ...createGeneroDto,
            imagen: file.filename,
        });
    }

    @Patch(":id")
    @UseInterceptors(
        FileInterceptor("imagen", {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `genero-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async update(@Param("id") id: number, @Body() updateGeneroDto: UpdateGeneroDto, @UploadedFile() file?: Express.Multer.File): Promise<Genero> {
        const updatedData = { ...updateGeneroDto };
        if (file) {
            updatedData.imagen = file.filename;
        }
        return this.generoService.update(id, updatedData);
    }

    @Delete(":id")
    async remove(@Param("id") id: number): Promise<void> {
        return this.generoService.remove(id);
    }
}
