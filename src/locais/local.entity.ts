import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';

@Entity()
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @ManyToOne(() => Categoria, {nullable: true})
  categoria: Categoria;

  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, { eager: true, onDelete: 'CASCADE' })
  usuario: Usuario;
}
