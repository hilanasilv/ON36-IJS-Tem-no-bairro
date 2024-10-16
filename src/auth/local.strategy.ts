import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, senha: string): Promise<any> {
    const usuario = await this.authService.validateUser(email, senha);
    if (usuario === null) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
