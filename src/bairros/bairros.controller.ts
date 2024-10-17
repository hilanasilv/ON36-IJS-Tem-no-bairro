import { Controller, Get } from '@nestjs/common';
import { BairrosService } from './bairros.service';

@Controller('bairros')
export class BairrosController {
  constructor(private readonly bairrosService: BairrosService) {}

  @Get()
  findAll() {
    return this.bairrosService.findAll();
  }
}
