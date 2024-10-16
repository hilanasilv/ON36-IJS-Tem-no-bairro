import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  usuarios: any;
  async findByEmail(email: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((user) => user.email === email);
    return usuario || null;
  }
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  create(usuario: Usuario): Promise<Usuario> {
    return this.usuariosRepository.save(usuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  findOne(id: number): Promise<Usuario> {
    return this.usuariosRepository.findOneBy({ id });
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, usuario);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
