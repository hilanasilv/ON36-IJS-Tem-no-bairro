import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaisModule } from '../src/locais/locais.module';
import { UsuariosModule } from '../src/usuarios/usuarios.module';
import { CategoriasModule } from '../src/categorias/categorias.module';
import dataSource from './database/typeorm.config'; 

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    LocaisModule,
    UsuariosModule,
    CategoriasModule,
  ],
})
export class AppModule {}
