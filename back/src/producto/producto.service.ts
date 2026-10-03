import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CrearProductoInput, ActualizarProductoInput } from './producto.input';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  encontrarTodos(categoriaId?: number): Promise<Producto[]> {
    if (categoriaId) {
      return this.productoRepo.find({
        where: { categoria: { id: categoriaId } },
        relations: ['categoria'],
      });
    }
    return this.productoRepo.find({ relations: ['categoria'] });
  }

  encontrarUno(id: number): Promise<Producto> {
    return this.productoRepo.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async descontarStock(id: number, cantidad: number): Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({ id });
    producto.disponibilidad = producto.disponibilidad - cantidad;
    return this.productoRepo.save(producto);
  }

  async crearProducto(input: CrearProductoInput): Promise<Producto> {
    const producto = this.productoRepo.create({
      ...input,
      categoria: { id: input.categoriaId } as any,
    });
    const guardado = await this.productoRepo.save(producto);
    return this.encontrarUno(guardado.id);
  }

  async actualizarProducto(input: ActualizarProductoInput): Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({ id: input.id });
    if (!producto) {
      throw new NotFoundException(`Producto ${input.id} no existe`);
    }

    if (input.nombre !== undefined) producto.nombre = input.nombre;
    if (input.imagen !== undefined) producto.imagen = input.imagen;
    if (input.precio !== undefined) producto.precio = input.precio;
    if (input.sabores !== undefined) producto.sabores = input.sabores;
    if (input.disponibilidad !== undefined) producto.disponibilidad = input.disponibilidad;
    if (input.categoriaId !== undefined) producto.categoria = { id: input.categoriaId } as any;

    const guardado = await this.productoRepo.save(producto);
    return this.encontrarUno(guardado.id);
  }

  async eliminarProducto(id: number): Promise<boolean> {
    const resultado = await this.productoRepo.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}
