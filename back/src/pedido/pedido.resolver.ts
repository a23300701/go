import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { ItemPedidoInput } from './item-pedido.input';
import { UsuarioService } from '../usuario/usuario.service';

@Resolver(() => Pedido)
export class PedidoResolver {
  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
  ) {}

  @Mutation(() => Pedido)
  async crearPedido(
    @Args({ name: 'items', type: () => [ItemPedidoInput] }) items: ItemPedidoInput[],
    @Context() contexto: any,
  ): Promise<Pedido> {
    const usuario = await this.usuarioService.exigirUsuario(contexto.req);
    return this.pedidoService.crearPedido(usuario, items);
  }

  @Query(() => [Pedido])
  async misPedidos(@Context() contexto: any): Promise<Pedido[]> {
    const usuario = await this.usuarioService.exigirUsuario(contexto.req);
    return this.pedidoService.encontrarDelUsuario(usuario.id);
  }

  @Query(() => [Pedido])
  async pedidos(@Context() contexto: any): Promise<Pedido[]> {
    await this.usuarioService.exigirAdmin(contexto.req);
    return this.pedidoService.encontrarTodos();
  }
}
