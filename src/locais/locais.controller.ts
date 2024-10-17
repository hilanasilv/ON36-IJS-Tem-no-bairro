import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { Local } from './local.entity';
import { CreateLocalDto } from './create-local.dto';

@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Post('cadastrar')
  async create(@Body() createLocalDto: CreateLocalDto) {
    return this.locaisService.create(createLocalDto);
  }

  @Get('buscar')
  async buscarLocais(
    @Query('bairro') bairro?: string,
    @Query('categoria') categoriaId?: number,
  ) {
    if (bairro && categoriaId) {
      return this.locaisService.buscarPorBairroECategoria(bairro, categoriaId);
    } else if (bairro) {
      return this.locaisService.buscarPorBairro(bairro);
    } else if (categoriaId) {
      return this.locaisService.buscarPorCategoria(categoriaId);
    } else {
      return [];
    }
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
