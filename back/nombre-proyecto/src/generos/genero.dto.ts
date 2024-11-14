import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGeneroDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del género no puede estar vacío' })
    nombre: string;

    @IsString()
    @IsNotEmpty({ message: 'La imagen del género no puede estar vacía' })
    imagen: string;
}

export class UpdateGeneroDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    imagen?: string;
}
