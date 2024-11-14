import { Controller, Get, Query } from '@nestjs/common';
import { GenerosService } from '../generos/generos.service';
import { ArtistasService } from '../artistas/artistas.service';
import { AlbunService } from '../albun/albun.service';
import { CancionesService } from '../canciones/canciones.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly generosService: GenerosService,
        private readonly artistasService: ArtistasService,
        private readonly albunService: AlbunService,
        private readonly cancionesService: CancionesService,
    ) {}
    @Get()
    async search(@Query('q') query: string) {
        if (!query || query.length < 2) {
            return {
                generos: [],
                artistas: [],
                albunes: [],
                canciones: [],
            };
        }

        const [generos, artistas, albunes, canciones] = await Promise.all([
            this.generosService.findByName(query),
            this.artistasService.findByName(query),
            this.albunService.findByName(query),
            this.cancionesService.findByName(query),
        ]);

        return {
            generos,
            artistas,
            albunes,
            canciones,
        };
    }
}
