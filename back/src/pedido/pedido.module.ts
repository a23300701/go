import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoResolver } from './pedido.resolver';
import { ProductoModule } from '../producto/producto.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, DetallePedido]),
    ProductoModule,
    UsuarioModule,
  ],
  providers: [PedidoService, PedidoResolver],
})
export class PedidoModule {}
