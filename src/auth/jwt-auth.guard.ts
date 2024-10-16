import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Pega o token do cabeçalho

    if (!token) return false; // Se não houver token, não pode acessar

    try {
      const payload = await this.jwtService.verifyAsync(token); // Verifica o token
      request.user = payload; // Adiciona o payload ao objeto da requisição
      return true; // Se tudo estiver certo, permite o acesso
    } catch (e) {
      return false; // Se ocorrer um erro na verificação, não permite o acesso
    }
  }
}
