import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaResolver } from './categoria.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService, CategoriaResolver],
  exports: [CategoriaService],
})
export class CategoriaModule {}
