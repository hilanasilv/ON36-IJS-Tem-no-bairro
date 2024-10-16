import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocaisService } from './locais.service';
import { Local } from './local.entity';

@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLocalDto: any) {
    return this.locaisService.create(createLocalDto);
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
