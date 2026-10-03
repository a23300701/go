import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

async function sembrarDatosDemo(dataSource: DataSource) {
  const rutaSql = path.join(__dirname, '..', 'db.sql');
  const contenido = fs.readFileSync(rutaSql, 'utf-8');
  const inserts = contenido.match(/INSERT INTO[\s\S]*?;/g) ?? [];

  for (const sentencia of inserts) {
    const tabla = sentencia.match(/INSERT INTO (\w+)/)?.[1];
    if (!tabla) continue;

    const [{ total }] = await dataSource.query(`SELECT COUNT(*) as total FROM ${tabla}`);
    if (Number(total) > 0) continue;

    await dataSource.query(sentencia);
    console.log(`Datos de ejemplo cargados en "${tabla}"`);
  }
}

async function iniciarServidor() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await sembrarDatosDemo(app.get(DataSource));

  await app.listen(3000);
  console.log('Servidor GraphQL corriendo en http://localhost:3000/graphql');
}

iniciarServidor();
