import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuariosService.create(usuario);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.usuariosService.findOne(+id); }

  @Put('') update(@Param('id') id: string, @Body() usuario: Usuario) { return this.usuariosService.update(+id, usuario); }
  
  @Delete('') remove(@Param('id') id: string) { return this.usuariosService.remove(+id); } }
