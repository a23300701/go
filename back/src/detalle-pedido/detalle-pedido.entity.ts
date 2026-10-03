import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { Producto } from '../producto/producto.entity';

@ObjectType()
@Entity()
export class DetallePedido {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Pedido)
  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;

  @Field(() => Producto)
  @ManyToOne(() => Producto, (producto) => producto.detalles)
  producto: Producto;

  @Field(() => Int)
  @Column()
  cantidad: number;

  @Field(() => Float)
  @Column('real')
  precioUnitario: number;
}
