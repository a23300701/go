import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class ItemPedidoInput {
  @Field(() => ID)
  productoId: number;

  @Field(() => Int)
  cantidad: number;
}
