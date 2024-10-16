import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; senha: string }) {
    const usuario = await this.authService.validateUser(loginDto.email, loginDto.senha);
    if (!usuario) {
      // Aqui você pode lançar um erro se as credenciais forem inválidas
      throw new Error('Credenciais inválidas');
    }
    return this.authService.login(usuario);
  }
}
