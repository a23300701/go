import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { ProductoService } from '../producto/producto.service';
import { ItemPedidoInput } from './item-pedido.input';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    private productoService: ProductoService,
  ) {}

  async crearPedido(usuario: Usuario, items: ItemPedidoInput[]): Promise<Pedido> {
    const detalles: DetallePedido[] = [];
    let total = 0;

    for (const item of items) {
      const producto = await this.productoService.encontrarUno(item.productoId);

      if (!producto) {
        throw new BadRequestException(`El producto ${item.productoId} no existe`);
      }

      if (producto.disponibilidad < item.cantidad) {
        throw new BadRequestException(
          `No hay suficiente stock de "${producto.nombre}". Disponibles: ${producto.disponibilidad}`,
        );
      }

      const detalle = new DetallePedido();
      detalle.producto = producto;
      detalle.cantidad = item.cantidad;
      detalle.precioUnitario = producto.precio;
      detalles.push(detalle);

      total += producto.precio * item.cantidad;

      await this.productoService.descontarStock(producto.id, item.cantidad);
    }

    const pedido = new Pedido();
    pedido.usuario = usuario;
    pedido.total = total;
    pedido.detalles = detalles;

    return this.pedidoRepo.save(pedido);
  }

  encontrarDelUsuario(usuarioId: number): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['detalles', 'detalles.producto'],
      order: { id: 'DESC' },
    });
  }

  encontrarTodos(): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      relations: ['usuario', 'detalles', 'detalles.producto'],
      order: { id: 'DESC' },
    });
  }
}
