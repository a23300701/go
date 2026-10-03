import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { DetallePedido } from '../detalle-pedido/detalle-pedido.entity';
import { Usuario } from '../usuario/usuario.entity';

@ObjectType()
@Entity()
export class Pedido {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Usuario, { nullable: true })
  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  usuario: Usuario;

  @Field()
  @CreateDateColumn()
  fecha: Date;

  @Field(() => Float)
  @Column('real')
  total: number;

  @Field(() => [DetallePedido])
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, { cascade: true })
  detalles: DetallePedido[];
}
