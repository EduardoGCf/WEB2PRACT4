// albun/albun.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAlbunDto {
    @IsString()
    @IsNotEmpty({ message: "El nombre del álbum no puede estar vacío" })
    nombre: string;

    @IsNumber()
    @IsNotEmpty({ message: "El ID del artista es obligatorio" })
    id_artista: number;

    @IsString()
    imagen: string;
}

export class UpdateAlbunDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsNumber()
    @IsOptional()
    id_artista?: number;

    @IsString()
    @IsOptional()
    imagen?: string;
}
