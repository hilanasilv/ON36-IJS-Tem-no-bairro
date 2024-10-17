import { Module } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { LocaisController } from './locais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './local.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Bairro } from '../bairros/bairro.entity';
import { BairrosModule } from 'src/bairros/bairros.module';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Usuario, Categoria, Bairro]),
  BairrosModule,
  UsuariosModule
],
  providers: [LocaisService],
  controllers: [LocaisController],
})
export class LocaisModule {}
