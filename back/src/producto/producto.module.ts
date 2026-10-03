import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoResolver } from './producto.resolver';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), UsuarioModule],
  providers: [ProductoService, ProductoResolver],
  exports: [ProductoService],
})
export class ProductoModule {}
