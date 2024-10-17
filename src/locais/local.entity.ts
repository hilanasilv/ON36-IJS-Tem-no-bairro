import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { Bairro } from '../bairros/bairro.entity';  

@Entity('locais')
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 255 })
  endereco: string;

  @ManyToOne(() => Bairro, (bairro) => bairro.locais, { eager: true })
  @JoinColumn({ name: 'bairroId' }) 
  bairro: Bairro;

  @Column({ type: 'varchar', length: 100, default: 'Sem informações sobre horário de funcionamento' })
  horarioFuncionamento: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.locais)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToMany(() => Categoria)
  @JoinTable({
    name: 'locais_categorias',
    joinColumn: { name: 'localId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoriaId', referencedColumnName: 'id' },
  })
  categorias: Categoria[];
}
