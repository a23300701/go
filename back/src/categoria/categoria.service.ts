import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  encontrarTodas(): Promise<Categoria[]> {
    return this.categoriaRepo.find();
  }

  encontrarUna(id: number): Promise<Categoria> {
    return this.categoriaRepo.findOne({
      where: { id },
      relations: ['productos'],
    });
  }
}
