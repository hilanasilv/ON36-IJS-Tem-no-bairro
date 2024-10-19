import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';
import { Categoria } from '../domains/entities/categoria.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenericErrorSwagger } from 'src/swagger/GenericErrorSwagger';
import { CategoriaEntitySwagger } from 'src/swagger/CategoriaEntittySwagger';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Adiciona uma nova categoria'})
  @ApiResponse({status: 201, description: 'Nova categoria adicionada'})
  @ApiResponse({ status: 400, description: 'Requisição inválida'})
  create(@Body() categoria: Categoria) {
    return this.categoriasService.create(categoria);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna a lista com todas as categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias retornada', type: CategoriaEntitySwagger})
  @ApiResponse({ status: 404, description: 'Nenhuma categoria encontrada', type: GenericErrorSwagger})
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma categoria através do id'})
  @ApiResponse({ status: 200, description: 'Categoria encontrada'})
  @ApiResponse({ status: 404, description: 'Categoria não encontrada', type: GenericErrorSwagger})
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Atualiza uma categoria através do id'})
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada', type: GenericErrorSwagger})
  update(@Param('id') id: string, @Body() categoria: Categoria) {
    return this.categoriasService.update(+id, categoria);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deleta uma categoria através do id'})
  @ApiResponse({ status: 204, description: 'Categoria deletada com sucesso'})
  @ApiResponse({ status: 404, description: 'Categoria não encontrada', type: GenericErrorSwagger})
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}