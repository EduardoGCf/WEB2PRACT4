// artista/artista.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateArtistaDto {
    @IsString()
    @IsNotEmpty({ message: "El nombre del artista no puede estar vacío" })
    nombre: string;

    @IsNumber()
    @IsNotEmpty({ message: "El ID del género es obligatorio" })
    id_genero: number;

    @IsString()
    imagen: string;
}

export class UpdateArtistaDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsNumber()
    @IsOptional()
    id_genero?: number;

    @IsString()
    @IsOptional()
    imagen?: string;
}
