import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { LocaisService } from '../services/locais.service';
import { Local } from '../domains/entities/local.entity';
import { CreateLocalDto } from '../dto/create-local.dto';
import { UpdateLocalDto } from '../dto/update-local.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { LocalEntitySwagger } from 'src/swagger/LocalEntitySwagger';
import { BuscaEntitySwagger } from 'src/swagger/BuscaEntitySwagger';
import { GenericErrorSwagger } from 'src/swagger/GenericErrorSwagger';

@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) { }

  @Post('cadastrar')
  @ApiOperation({ summary: 'Cadastra um novo local' })
  @ApiResponse({ status: 201, description: 'Local cadastrado com sucesso', type:LocalEntitySwagger })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  async create(@Body() createLocalDto: CreateLocalDto) {
    return this.locaisService.create(createLocalDto);
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Busca um local por bairro e/ou categoria' })
  @ApiQuery({ name: 'bairro', required: false, description: 'Nome do bairro para busca' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Nome da categoria para busca' })
  @ApiResponse({ status: 200, description: 'Lista de locais retornada', type:BuscaEntitySwagger })
  @ApiResponse({ status: 404, description: 'Nenhum local encontrado' })
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
  @ApiOperation({ summary: 'Retorna um local através do id' })
  @ApiResponse({ status: 200, description: 'Local encontrado', type:BuscaEntitySwagger })
  @ApiResponse({ status: 404, description: 'Local não encontrado' })
  findOne(@Param('id') id: string) {
    return this.locaisService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um local através do id' })
  @ApiResponse({ status: 200, description: 'Local atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Local não encontrado' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  async update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.locaisService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um local através do id' })
  @ApiResponse({ status: 204, description: 'Local deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Local não encontrado', type:GenericErrorSwagger })
  remove(@Param('id') id: string) {
    return this.locaisService.remove(+id);
  }
}
