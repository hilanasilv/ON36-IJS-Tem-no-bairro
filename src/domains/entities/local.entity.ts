import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';
import { Bairro } from './bairro.entity';  

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
    inverseJoinColumn: { name: 'categoriaNome', referencedColumnName: 'id' },
  })
  categorias: Categoria[];
}
