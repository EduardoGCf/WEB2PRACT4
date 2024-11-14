import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GenerosModule } from './generos/generos.module';
import { ArtistasModule } from './artistas/artistas.module';
import { AlbunModule } from './albun/albun.module';
import { CancionesModule } from './canciones/canciones.module';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_web2_pract4',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        GenerosModule,
        ArtistasModule,
        AlbunModule,
        CancionesModule,
        SearchModule,
    ],
    controllers: [AppController, SearchController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
