// artistas/artistas.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { ArtistasService } from "./artistas.service";
import { Artista } from "./artista.entity";
import { CreateArtistaDto, UpdateArtistaDto } from "./artista.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("artistas")
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Get()
  async findAll(): Promise<Partial<Artista>[]> {
    const artistas = await this.artistasService.findAll();
    return artistas.map((artista) => ({
      ...artista,
      imagen: `http://localhost:3000/uploads/${artista.imagen}`, // URL completa
    }));
  }

  @Get(":id/albunes")
  async findAlbunesByArtista(@Param("id") id: number) {
    const albunes = await this.artistasService.findAlbunesByArtista(id);

    return albunes.map((albun) => ({
      ...albun,
      imagen: albun.imagen
        ? `http://localhost:3000/uploads/${albun.imagen}`
        : `http://localhost:3000/uploads/default.jpg`, // Asegúrate de tener una imagen por defecto
    }));
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Partial<Artista>> {
    const artista = await this.artistasService.findOne(id);

    if (!artista) {
      throw new NotFoundException(`Artista con ID ${id} no encontrado`);
    }

    return {
      ...artista,
      imagen: artista.imagen
        ? `http://localhost:3000/uploads/${artista.imagen}`
        : null,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("imagen", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `artista-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  async create(
    @Body() createArtistaDto: CreateArtistaDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Artista> {
    return this.artistasService.create({
      ...createArtistaDto,
      imagen: file.filename,
    });
  }

  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("imagen", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `artista-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  async update(
    @Param("id") id: number,
    @Body() updateArtistaDto: UpdateArtistaDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Artista> {
    if (file) {
      updateArtistaDto.imagen = file.filename;
    }

    const hasUpdates = Object.keys(updateArtistaDto).length > 0;
    if (!hasUpdates) {
      throw new BadRequestException("No hay datos válidos para actualizar.");
    }

    return this.artistasService.update(id, updateArtistaDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.artistasService.remove(id);
  }

  @Get("artistas/:id/albunes")
  async getAlbumsByArtist(@Param("id") id: number) {
    return this.artistasService.findAlbumsByArtist(id);
  }

  @Get("artistas/:id/canciones")
  async getSongsByArtist(@Param("id") id: number) {
    return this.artistasService.findSongsByArtist(id);
  }
}
