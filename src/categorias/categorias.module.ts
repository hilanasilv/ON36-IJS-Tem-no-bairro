import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
