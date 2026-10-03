import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Resolver(() => Categoria)
export class CategoriaResolver {
  constructor(private categoriaService: CategoriaService) {}

  @Query(() => [Categoria])
  categorias(): Promise<Categoria[]> {
    return this.categoriaService.encontrarTodas();
  }

  @Query(() => Categoria, { nullable: true })
  categoria(@Args('id', { type: () => ID }) id: number): Promise<Categoria> {
    return this.categoriaService.encontrarUna(id);
  }
}
