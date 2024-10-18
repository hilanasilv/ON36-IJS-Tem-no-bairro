import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Local } from './local.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @OneToMany(() => Local, (local) => local.usuario)
  locais: Local[];
}
