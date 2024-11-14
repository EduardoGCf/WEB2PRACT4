import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Artista } from "../artistas/artista.entity";
import { Cancion } from "../canciones/cancion.entity";

@Entity("albun")
export class Albun {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    nombre: string;

    @Column({ type: "varchar", nullable: true })
    imagen: string;

    @ManyToOne(() => Artista, artista => artista.albunes, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" }) // 'eager' para traer automáticamente el artista
    @JoinColumn({ name: "id_artista" }) // Llave foránea
    artista: Artista;

    @OneToMany(() => Cancion, cancion => cancion.albun, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    canciones: Cancion[];
}
