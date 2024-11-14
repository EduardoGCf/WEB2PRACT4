import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Genero } from '../generos/genero.entity';
import { Albun } from '../albun/albun.entity';

@Entity('artista')
export class Artista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', nullable: true })
    imagen: string;

    @ManyToOne(() => Genero, genero => genero.artistas, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'id_genero' })
    genero: Genero;

    @OneToMany(() => Albun, albun => albun.artista, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    albunes: Albun[];
}
