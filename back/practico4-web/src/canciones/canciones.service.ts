// canciones/canciones.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Cancion } from "./cancion.entity";
import { NotFoundException } from "@nestjs/common";
import { Albun } from "../albun/albun.entity";
import { CreateCancionDto, UpdateCancionDto } from "./cancion.dto";

@Injectable()
export class CancionesService {
  constructor(
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
    @InjectRepository(Albun)
    private readonly albunRepository: Repository<Albun>
  ) {}

  findAll(): Promise<Cancion[]> {
    return this.cancionRepository.find({ relations: ["albun"] });
  }

  async findByName(query: string) {
    return this.cancionRepository.find({
      where: { nombre: ILike(`%${query}%`) },
      relations: ["albun", "albun.artista"], // Incluir relaciones albun y artista
    });
  }

  async findOne(id: number, relations: string[] = []): Promise<Cancion> {
    const cancion = await this.cancionRepository.findOne({
      where: { id },
      relations,
    });

    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }

    return cancion;
  }

  async create(cancionData: CreateCancionDto): Promise<Cancion> {
    const newCancion = this.cancionRepository.create({
      ...cancionData,
      albun: { id: cancionData.id_albun }, // Relaciona el álbum por su ID
    });
    return this.cancionRepository.save(newCancion);
  }

  async update(
    id: number,
    updateCancionDto: UpdateCancionDto
  ): Promise<Cancion> {
    const cancion = await this.cancionRepository.findOne({
      where: { id },
      relations: ["albun"],
    });

    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }

    if (updateCancionDto.id_albun) {
      const albun = await this.albunRepository.findOne({
        where: { id: updateCancionDto.id_albun },
      });

      if (!albun) {
        throw new NotFoundException(
          `Álbum con ID ${updateCancionDto.id_albun} no encontrado`
        );
      }

      cancion.albun = albun; // Asignar la relación correctamente.
    }

    // Asignar otros campos.
    Object.assign(cancion, updateCancionDto);

    return this.cancionRepository.save(cancion); // Guardar la canción con la relación actualizada.
  }

  async remove(id: number): Promise<void> {
    await this.cancionRepository.delete(id);
  }
}
