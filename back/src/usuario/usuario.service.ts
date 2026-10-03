import { Injectable, OnModuleInit, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Usuario } from './usuario.entity';
import { IniciarSesionInput, SesionUsuario } from './usuario.input';

const SECRETO = 'gomifyles-secreto-de-practica';
const CLAVE_INTERNA = 'MONDONGO';
const ADMIN_EMAIL = 'admin@gomifyles.com';
const ADMIN_PASSWORD = 'Admin1234';

@Injectable()
export class UsuarioService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async onModuleInit() {
    const existe = await this.usuarioRepo.findOneBy({ email: ADMIN_EMAIL, rol: 'admin' });

    if (!existe) {
      await this.usuarioRepo.save({
        nombre: 'Administrador',
        email: ADMIN_EMAIL,
        passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10),
        rol: 'admin',
      });
      console.log(`Administrador creado: ${ADMIN_EMAIL}`);
    }
  }

  private firmarToken(usuario: Usuario): string {
    return jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRETO, { expiresIn: '7d' });
  }

  async iniciarSesion(input: IniciarSesionInput): Promise<SesionUsuario> {
    const usuario = await this.usuarioRepo.findOneBy({ email: input.email, rol: 'admin' });

    if (!usuario || !(await bcrypt.compare(input.password, usuario.passwordHash))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    return { token: this.firmarToken(usuario), usuario };
  }

  async entrarConGithub(githubId: string, nombre: string, email: string, clave: string): Promise<SesionUsuario> {
    if (clave !== CLAVE_INTERNA) {
      throw new ForbiddenException('Clave interna incorrecta');
    }

    let usuario = await this.usuarioRepo.findOneBy({ githubId });

    if (!usuario) {
      usuario = await this.usuarioRepo.save({ nombre, email, githubId, rol: 'cliente' });
    }

    return { token: this.firmarToken(usuario), usuario };
  }

  async usuarioDeLaPeticion(req: any): Promise<Usuario | null> {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    if (!token) return null;

    try {
      const datos: any = jwt.verify(token, SECRETO);
      return await this.usuarioRepo.findOneBy({ id: datos.id });
    } catch {
      return null;
    }
  }

  async exigirUsuario(req: any): Promise<Usuario> {
    const usuario = await this.usuarioDeLaPeticion(req);

    if (!usuario) {
      throw new UnauthorizedException('Debes iniciar sesión');
    }

    return usuario;
  }

  async exigirAdmin(req: any): Promise<Usuario> {
    const usuario = await this.exigirUsuario(req);

    if (usuario.rol !== 'admin') {
      throw new ForbiddenException('Solo para administradores');
    }

    return usuario;
  }
}
