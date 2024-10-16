import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './local.entity';

@Injectable()
export class LocaisService {
  constructor(
    @InjectRepository(Local)
    private locaisRepository: Repository<Local>,
  ) {}

  create(local: Local): Promise<Local> {
    return this.locaisRepository.save(local);
  }

  findAll(): Promise<Local[]> {
    return this.locaisRepository.find();
  }

  findOne(id: number): Promise<Local> {
    return this.locaisRepository.findOneBy({ id });
  }

  async update(id: number, local: Partial<Local>): Promise<Local> {
    await this.locaisRepository.update(id, local);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.locaisRepository.delete(id);
  }
}
