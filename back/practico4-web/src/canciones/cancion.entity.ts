import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Albun } from "../albun/albun.entity";

@Entity("cancion")
export class Cancion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    nombre: string;

    @Column({ type: "varchar", nullable: true })
    cancion_mp3: string;

    @Column({ type: "varchar", nullable: true })
    imagen: string;

    @ManyToOne(() => Albun, albun => albun.canciones, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "id_albun" }) // Asegúrate de que esta columna coincida.
    albun: Albun;
}
