import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Usuario } from './usuario.entity';

@InputType()
export class IniciarSesionInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class SesionUsuario {
  @Field()
  token: string;

  @Field(() => Usuario)
  usuario: Usuario;
}
