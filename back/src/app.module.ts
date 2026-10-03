import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { PedidoModule } from './pedido/pedido.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({ req }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-spring-rain-b5agcdo6.c-7.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_2OduRtx5iqrF',
      database: 'neondb',
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
    }),

    CategoriaModule,
    ProductoModule,
    PedidoModule,
    UsuarioModule,
  ],
})
export class AppModule {}
