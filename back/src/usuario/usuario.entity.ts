import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';

@ObjectType()
@Entity()
export class Usuario {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  githubId: string;

  @Field()
  @Column({ default: 'cliente' })
  rol: string;

  @Field()
  @CreateDateColumn()
  fechaRegistro: Date;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];
}
