import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaisModule } from './application/modules/locais.module';
import { UsuariosModule } from './application/modules/usuarios.module';
import {BairrosModule} from './application/modules/bairros.module'
import { CategoriasModule } from './application/modules/categorias.module';
import dataSource from './database/typeorm.config'; 

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    LocaisModule,
    UsuariosModule,
    CategoriasModule,
    BairrosModule
  ],
})
export class AppModule {}
