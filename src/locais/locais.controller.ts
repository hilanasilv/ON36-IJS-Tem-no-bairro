import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { Local } from './local.entity';

@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Post()
  create(@Body() local: Local) {
    return this.locaisService.create(local);
  }

  @Get()
  findAll() {
    return this.locaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locaisService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() local: Local) {
    return this.locaisService.update(+id, local);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locaisService.remove(+id);
  }
}
