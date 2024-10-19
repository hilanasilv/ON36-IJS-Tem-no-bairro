import { Injectable } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class AppService {
  getHello(): string {
    return "Colabore com a API Tem no bairro 📍";
  }
}
