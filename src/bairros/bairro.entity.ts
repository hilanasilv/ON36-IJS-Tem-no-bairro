import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Local } from '../locais/local.entity';

@Entity('bairros')
export class Bairro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Local, (local) => local.bairro)
  locais: Local[];
}
