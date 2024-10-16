import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaisModule } from './locais/locais.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
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
