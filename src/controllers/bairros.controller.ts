import { Controller, Get } from '@nestjs/common';
import { BairrosService } from '../services/bairros.service';

@Controller('bairros')
export class BairrosController {
  constructor(private readonly bairrosService: BairrosService) {}

  @Get()
  findAll() {
    return this.bairrosService.findAll();
  }
}
