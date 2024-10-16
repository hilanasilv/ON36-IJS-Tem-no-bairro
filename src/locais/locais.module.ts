import { Module } from '@nestjs/common';
import { LocaisService } from '../locais/locais.service';
import { LocaisController } from '../locais/locais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './local.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Usuario, Categoria])],
  providers: [LocaisService],
  controllers: [LocaisController],
})
export class LocaisModule {}
