import { Controller, Get } from '@nestjs/common';
import { BairrosService } from '../services/bairros.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BairroEntitySwagger } from 'src/swagger/BairroEntitySwagger';

@Controller('bairros')
export class BairrosController {
  constructor(private readonly bairrosService: BairrosService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna a lista com todos os bairros'})
  @ApiResponse({status: 201, description: 'Lista de bairros encontrada', type:BairroEntitySwagger})
  @ApiResponse({ status: 400, description: 'Nenhum bairro encontrado'})
  findAll() {
    return this.bairrosService.findAll();
  }
}
