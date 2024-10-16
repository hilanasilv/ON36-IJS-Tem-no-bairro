import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsuariosModule } from '../usuarios/usuarios.module'; 

@Module({
  imports: [UsuariosModule, JwtModule],
  providers: [AuthService, LocalStrategy, JwtAuthGuard],
  exports:[JwtAuthGuard, AuthService, JwtModule],
})
export class AuthModule {}
