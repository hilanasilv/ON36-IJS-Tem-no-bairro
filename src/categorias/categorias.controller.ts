import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriasService.create(categoria);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoria: Categoria) {
    return this.categoriasService.update(+id, categoria);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}