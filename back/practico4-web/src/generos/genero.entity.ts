import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Artista } from "../artistas/artista.entity";

@Entity("genero")
export class Genero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    nombre: string;

    @Column({ type: "varchar", nullable: true })
    imagen: string;

    @OneToMany(() => Artista, artista => artista.genero, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    artistas: Artista[]; // Relación uno a muchos
}
