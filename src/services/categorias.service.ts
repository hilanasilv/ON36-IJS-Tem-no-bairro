import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../domains/entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  create(categoria: Categoria): Promise<Categoria> {
    return this.categoriasRepository.save(categoria);
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  findOne(id: number): Promise<Categoria> {
    return this.categoriasRepository.findOneBy({ id });
  }

  async update(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    await this.categoriasRepository.update(id, categoria);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriasRepository.delete(id);
  }
}
