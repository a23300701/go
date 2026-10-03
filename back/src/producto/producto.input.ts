import { InputType, Field, ID, Float, Int } from '@nestjs/graphql';

@InputType()
export class CrearProductoInput {
  @Field()
  nombre: string;

  @Field({ nullable: true })
  imagen?: string;

  @Field(() => Float)
  precio: number;

  @Field(() => [String], { nullable: true })
  sabores?: string[];

  @Field(() => Int)
  disponibilidad: number;

  @Field(() => ID)
  categoriaId: number;
}

@InputType()
export class ActualizarProductoInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  imagen?: string;

  @Field(() => Float, { nullable: true })
  precio?: number;

  @Field(() => [String], { nullable: true })
  sabores?: string[];

  @Field(() => Int, { nullable: true })
  disponibilidad?: number;

  @Field(() => ID, { nullable: true })
  categoriaId?: number;
}
