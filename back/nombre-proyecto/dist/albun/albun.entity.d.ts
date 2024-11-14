import { Artista } from '../artistas/artista.entity';
import { Cancion } from '../canciones/cancion.entity';
export declare class Albun {
    id: number;
    nombre: string;
    imagen: string;
    artista: Artista;
    canciones: Cancion[];
}
