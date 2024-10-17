import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './local.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateLocalDto } from './create-local.dto';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import {Bairro} from '../bairros/bairro.entity';

@Injectable()
export class LocaisService {
  buscarPorCategoria(categoriaId: number) {
    throw new Error('Method not implemented.');
  }
  buscarPorBairro(bairro: string) {
    throw new Error('Method not implemented.');
  }
  buscarPorBairroECategoria(bairro: string, categoriaId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Local)
    private locaisRepository: Repository<Local>,

    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,

    @InjectRepository(Bairro)
    private bairrosRepository: Repository<Bairro>,

    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    const { nome, descricao, endereco, categorias: categoriasNome, usuarioNome, bairroId, horarioFuncionamento } = createLocalDto;
  
    const bairro = await this.bairrosRepository.findOne({where: {id: bairroId}});
    if (!bairro) {
      throw new Error(`Bairro com ID '${bairroId}' não encontrado`);
    }
  
    let usuario = await this.usuariosService.findByName(usuarioNome);
    if (!usuario) {
      usuario = this.usuariosRepository.create({ nome: usuarioNome });
      await this.usuariosRepository.save(usuario);
    }
  
    const categoria = await this.categoriasRepository.findOne({ where: { nome: categoriasNome } });
    if (!categoria) {
      throw new Error(`Categoria '${categoriasNome}' não encontrada`);
    }
  
    const local = this.locaisRepository.create({
      nome,
      descricao,
      endereco,
      bairro,      
      horarioFuncionamento: horarioFuncionamento || 'Sem informações sobre horário de funcionamento',
      categorias: [categoria], 
      usuario,
    });
  
    return this.locaisRepository.save(local);
  }
  
  async findByFilters(bairroId?: number, categoriaNome?: string): Promise<Local[]> {
    const query = this.locaisRepository.createQueryBuilder('local')
      .leftJoinAndSelect('local.usuario', 'usuario')
      .leftJoinAndSelect('local.bairro', 'bairro')
      .leftJoinAndSelect('local.categorias', 'categoria');
  
    if (bairroId) {
      query.andWhere('bairro.id = :bairroId', { bairroId });
    }
  
    if (categoriaNome) {
      query.andWhere('categoria.nome = :categoriaNome', { categoriaNome });
    }
  
    const locais = await query.getMany();
    console.log('Locais filtrados:', locais);
    return locais;
  }  

  async findAll(): Promise<Local[]> {
    return this.locaisRepository.find({ relations: ['usuario', 'categorias', 'bairros'] });
  }

  async findOne(id: number): Promise<Local> {
    return this.locaisRepository.findOne({ where: { id }, relations: ['usuario', 'categorias', 'bairros'] });
  }

  async update(id: number, local: Partial<Local>): Promise<Local> {
    await this.locaisRepository.update(id, local);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.locaisRepository.delete(id);
  }
}
