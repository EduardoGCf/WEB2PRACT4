import { Genero } from "../generos/genero.entity";
import { Albun } from "../albun/albun.entity";
export declare class Artista {
    id: number;
    nombre: string;
    imagen: string;
    genero: Genero;
    albunes: Albun[];
}
