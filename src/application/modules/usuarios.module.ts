import { Module } from '@nestjs/common';
import { UsuariosService } from '../../services/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../domains/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  exports: [UsuariosService,]
})
export class UsuariosModule {}
