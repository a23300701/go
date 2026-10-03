import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioResolver } from './usuario.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioService, UsuarioResolver],
  exports: [UsuarioService],
})
export class UsuarioModule {}
