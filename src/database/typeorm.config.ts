import { DataSource } from 'typeorm';
import { Local } from '../locais/local.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { Bairro } from '../bairros/bairro.entity';
import * as dotenv from 'dotenv';

dotenv.config(); 

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Local, Usuario, Categoria, Bairro],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
});

export default dataSource;