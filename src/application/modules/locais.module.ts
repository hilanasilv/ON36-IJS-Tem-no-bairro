import { Module } from '@nestjs/common';
import { LocaisService } from '../../services/locais.service';
import { LocaisController } from '../../controllers/locais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from '../../domains/entities/local.entity';
import { Usuario } from '../../domains/entities/usuario.entity';
import { Categoria } from '../../domains/entities/categoria.entity';
import { UsuariosModule } from '../modules/usuarios.module';
import { Bairro } from '../../domains/entities/bairro.entity';
import { BairrosModule } from '../modules/bairros.module';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Usuario, Categoria, Bairro]),
  BairrosModule,
  UsuariosModule
],
  providers: [LocaisService],
  controllers: [LocaisController],
})
export class LocaisModule {}
