import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { LocaisService } from '../services/locais.service';
import { Local } from '../domains/entities/local.entity';
import { CreateLocalDto } from '../dto/create-local.dto';
import { UpdateLocalDto } from '../dto/update-local.dto';

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
    @Query('categoria') categoriaNome?: string,  
  ) {
    if (bairro && categoriaNome) {
      return this.locaisService.buscarPorBairroECategoria(bairro, categoriaNome);
    } else if (bairro) {
      return this.locaisService.buscarPorBairro(bairro);
    } else if (categoriaNome) {
      return this.locaisService.buscarPorCategoria(categoriaNome);
    } else {
      return this.locaisService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locaisService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.locaisService.update(+id, updateLocalDto);
  }  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locaisService.remove(+id);
  }
}
