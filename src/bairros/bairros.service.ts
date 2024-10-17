import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bairro } from './bairro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BairrosService {
  constructor(
    @InjectRepository(Bairro)
    private readonly bairroRepository: Repository<Bairro>,
  ) {}

  findAll() {
    return this.bairroRepository.find();
  }
}
