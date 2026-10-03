import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { IniciarSesionInput, SesionUsuario } from './usuario.input';

@Resolver(() => Usuario)
export class UsuarioResolver {
  constructor(private usuarioService: UsuarioService) {}

  @Mutation(() => SesionUsuario)
  iniciarSesion(@Args('input') input: IniciarSesionInput): Promise<SesionUsuario> {
    return this.usuarioService.iniciarSesion(input);
  }

  @Mutation(() => SesionUsuario)
  entrarConGithub(
    @Args('githubId') githubId: string,
    @Args('nombre') nombre: string,
    @Args('email', { nullable: true }) email: string,
    @Args('clave') clave: string,
  ): Promise<SesionUsuario> {
    return this.usuarioService.entrarConGithub(githubId, nombre, email, clave);
  }

  @Query(() => Usuario, { nullable: true })
  yo(@Context() contexto: any): Promise<Usuario | null> {
    return this.usuarioService.usuarioDeLaPeticion(contexto.req);
  }
}
