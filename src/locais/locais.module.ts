import { Module } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { LocaisController } from './locais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './local.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Usuario, Categoria]),AuthModule],
  providers: [LocaisService],
  controllers: [LocaisController],
})
export class LocaisModule {}
