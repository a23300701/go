import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { CrearProductoInput, ActualizarProductoInput } from './producto.input';
import { UsuarioService } from '../usuario/usuario.service';

@Resolver(() => Producto)
export class ProductoResolver {
  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
  ) {}

  @Query(() => [Producto])
  productos(
    @Args('categoriaId', { type: () => ID, nullable: true }) categoriaId?: number,
  ): Promise<Producto[]> {
    return this.productoService.encontrarTodos(categoriaId);
  }

  @Query(() => Producto, { nullable: true })
  producto(@Args('id', { type: () => ID }) id: number): Promise<Producto> {
    return this.productoService.encontrarUno(id);
  }

  @Mutation(() => Producto)
  async crearProducto(@Args('input') input: CrearProductoInput, @Context() contexto: any): Promise<Producto> {
    await this.usuarioService.exigirAdmin(contexto.req);
    return this.productoService.crearProducto(input);
  }

  @Mutation(() => Producto)
  async actualizarProducto(@Args('input') input: ActualizarProductoInput, @Context() contexto: any): Promise<Producto> {
    await this.usuarioService.exigirAdmin(contexto.req);
    return this.productoService.actualizarProducto(input);
  }

  @Mutation(() => Boolean)
  async eliminarProducto(@Args('id', { type: () => ID }) id: number, @Context() contexto: any): Promise<boolean> {
    await this.usuarioService.exigirAdmin(contexto.req);
    return this.productoService.eliminarProducto(id);
  }
}
