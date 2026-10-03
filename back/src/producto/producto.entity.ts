import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';

@ObjectType()
@Entity()
export class Producto {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imagen: string;

  @Field(() => Float)
  @Column('real')
  precio: number;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  sabores: string[];

  @Field(() => Int)
  @Column({ default: 0 })
  disponibilidad: number;

  @Field(() => Categoria)
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @Field(() => [DetallePedido], { nullable: true })
  @OneToMany(() => DetallePedido, (detalle) => detalle.producto)
  detalles: DetallePedido[];
}
