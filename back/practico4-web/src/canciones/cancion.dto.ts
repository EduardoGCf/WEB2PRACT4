// canciones/cancion.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateCancionDto {
    @IsString()
    @IsNotEmpty({ message: "El nombre de la canción no puede estar vacío" })
    nombre: string;

    @IsNumber()
    @IsNotEmpty({ message: "El ID del álbum es obligatorio" })
    id_albun: number;

    imagen?: string;
    cancion_mp3?: string;
}

export class UpdateCancionDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    imagen?: string;

    @IsString()
    @IsOptional()
    cancion_mp3?: string;

    @IsNumber({}, { message: "El id_albun debe ser un número" })
    @IsOptional()
    id_albun?: number; // Asegúrate de que sea un número.
}
