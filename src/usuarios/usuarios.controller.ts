import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Endpoint para registrar um novo usuário
  @Post('registrar')
  async create(@Body() usuario: Usuario) {
    // Verifica se o email já está em uso
    const usuarioExistente = await this.usuariosService.findByEmail(usuario.email);
    if (usuarioExistente) {
      throw new HttpException('Email já está em uso', HttpStatus.BAD_REQUEST);
    }

    // Hash da senha antes de salvar
    const saltRounds = 10;
    usuario.senha = await bcrypt.hash(usuario.senha, saltRounds);

    // Criar o usuário
    return this.usuariosService.create(usuario);
  }

  // Retorna todos os usuários
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // Retorna um usuário específico pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  // Atualiza as informações de um usuário (pode incluir atualizar senha, se necessário)
  @Put(':id')
  async update(@Param('id') id: string, @Body() usuario: Usuario) {
    // Verifica se o email está em uso por outro usuário, se o email foi alterado
    const usuarioExistente = await this.usuariosService.findByEmail(usuario.email);
    if (usuarioExistente && usuarioExistente.id !== +id) {
      throw new HttpException('Email já está em uso por outro usuário', HttpStatus.BAD_REQUEST);
    }

    // Atualiza a senha se fornecida
    if (usuario.senha) {
      const saltRounds = 10;
      usuario.senha = await bcrypt.hash(usuario.senha, saltRounds);
    }

    return this.usuariosService.update(+id, usuario);
  }

  // Remove um usuário pelo ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
