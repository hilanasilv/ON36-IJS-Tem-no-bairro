import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Local } from '../domains/entities/local.entity';
import { UsuariosService } from './usuarios.service';
import { CreateLocalDto } from '../dto/create-local.dto';
import { Usuario } from '../domains/entities/usuario.entity';
import { Categoria } from '../domains/entities/categoria.entity';
import { Bairro } from '../domains/entities/bairro.entity';
import { UpdateLocalDto } from '../dto/update-local.dto';

@Injectable()
export class LocaisService {
  async buscarPorCategoria(categoriaNome: string): Promise<Local[]> {
    return this.locaisRepository.createQueryBuilder('local')
      .leftJoinAndSelect('local.categorias', 'categoria')
      .where('categoria.nome = :categoriaNome', { categoriaNome })
      .getMany();
  }

  async buscarPorBairro(bairro: string): Promise<Local[]> {
    return this.locaisRepository.createQueryBuilder('local')
      .leftJoinAndSelect('local.bairro', 'bairro')
      .where('bairro.nome = :bairro', { bairro })
      .getMany();
  }

  async buscarPorBairroECategoria(bairro: string, categoriaNome: string): Promise<Local[]> {
    return this.locaisRepository.createQueryBuilder('local')
      .leftJoinAndSelect('local.bairro', 'bairro')
      .leftJoinAndSelect('local.categorias', 'categoria')
      .where('bairro.nome = :bairro', { bairro })
      .andWhere('categoria.nome = :categoriaNome', { categoriaNome })
      .getMany();
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
  ) { }

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    const { nome, descricao, endereco, categorias: categoriasNome, usuarioNome, bairroNome, horarioFuncionamento } = createLocalDto;

    const bairro = await this.bairrosRepository.findOne({ where: { nome: bairroNome } });
    if (!bairro) {
      throw new Error(`Bairro com nome '${bairroNome}' não encontrado`);
    }

    let usuario = await this.usuariosService.findByName(usuarioNome);
    if (!usuario) {
      usuario = this.usuariosRepository.create({ nome: usuarioNome });
      await this.usuariosRepository.save(usuario);
    }

    const categoriasEntidades = await Promise.all(
      categoriasNome.map(async (categoriaNome) => {
        let categoria = await this.categoriasRepository.findOne({ where: { nome: categoriaNome } });
        if (!categoria) {
          throw new Error(`Categoria '${categoriaNome}' não encontrada`);
        }
        return categoria;
      })
    );

    const local = this.locaisRepository.create({
      nome,
      descricao,
      endereco,
      bairro,
      horarioFuncionamento: horarioFuncionamento || 'Sem informações sobre horário de funcionamento',
      categorias: categoriasEntidades,
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

  async findAll(): Promise<any[]> {
    const locais = await this.locaisRepository.createQueryBuilder('local')
      .leftJoinAndSelect('local.usuario', 'usuario')
      .leftJoinAndSelect('local.bairro', 'bairro')
      .select([
        'local.id', 'local.nome', 'local.descricao', 'local.endereco',
        'local.horarioFuncionamento', 'usuario.nome', 'bairro.nome'
      ])
      .getMany();

    return locais.map(local => ({
      id: local.id,
      nome: local.nome,
      descricao: local.descricao,
      endereco: local.endereco,
      horarioFuncionamento: local.horarioFuncionamento,
      usuarioNome: local.usuario.nome,
      bairroNome: local.bairro.nome
    }));
  }

  async findOne(id: number): Promise<any> {
    const local = await this.locaisRepository.createQueryBuilder('local')
      .leftJoinAndSelect('local.usuario', 'usuario')
      .leftJoinAndSelect('local.bairro', 'bairro')
      .select([
        'local.id', 'local.nome', 'local.descricao', 'local.endereco',
        'local.horarioFuncionamento', 'usuario.nome', 'bairro.nome'
      ])
      .where('local.id = :id', { id })
      .getOne();

    return {
      id: local.id,
      nome: local.nome,
      descricao: local.descricao,
      endereco: local.endereco,
      horarioFuncionamento: local.horarioFuncionamento,
      usuarioNome: local.usuario.nome,
      bairroNome: local.bairro.nome
    };
  }


  async update(id: number, updateLocalDto: UpdateLocalDto): Promise<Local> {
    const { nome, descricao, endereco, categoria, usuarioNome, bairroNome, horarioFuncionamento } = updateLocalDto;

    const local = await this.locaisRepository.findOne({ where: { id }, relations: ['categorias', 'bairro', 'usuario'] });
    if (!local) {
      throw new Error(`Local com ID '${id}' não encontrado`);
    }

    local.nome = nome || local.nome;
    local.descricao = descricao || local.descricao;
    local.endereco = endereco || local.endereco;
    local.horarioFuncionamento = horarioFuncionamento || local.horarioFuncionamento;

    const bairro = await this.bairrosRepository.findOne({ where: { nome: bairroNome } });
    if (!bairro) {
      throw new Error(`Bairro '${bairroNome}' não encontrado`);
    }
    local.bairro = bairro;

    let usuario = await this.usuariosService.findByName(usuarioNome);
    if (!usuario) {
      usuario = this.usuariosRepository.create({ nome: usuarioNome });
      await this.usuariosRepository.save(usuario);
    }
    local.usuario = usuario;

    if (categoria) { 
      const categorias = await this.categoriasRepository.findBy({
        nome: In(Array.isArray(categoria) ? categoria : [categoria]), 
      });
      if (categorias.length === 0) {
        throw new Error(`Categoria(s) não encontrada(s): ${categoria}`);
      }
      local.categorias = categorias;
    }

    return this.locaisRepository.save(local);
  }

  async remove(id: number): Promise<void> {
    await this.locaisRepository.delete(id);
  }
}
