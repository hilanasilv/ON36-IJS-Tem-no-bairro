import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity'; // Usando a entidade

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioService.findByEmail(email);
    
    // Verifica se o usuário foi encontrado
    if (!usuario) {
      return null; // Ou lance uma exceção, se preferir
    }
  
    // Agora pode comparar a senha
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (isPasswordValid) {
      // Remove a senha do resultado
      const { senha: _, ...result } = usuario; // usa o nome `senha: _` para indicar que estamos descartando a senha
      return result as Usuario; // Retorna o usuário sem a senha
    }
    
    return null; // Retorna null se a senha estiver incorreta
  }

  async login(user: Usuario) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
