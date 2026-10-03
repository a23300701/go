import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../producto/producto.entity';

@ObjectType()
@Entity()
export class Categoria {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  descripcion: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imagen: string;

  @Field(() => [Producto], { nullable: true })
  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
