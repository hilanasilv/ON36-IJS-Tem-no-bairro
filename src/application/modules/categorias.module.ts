import { Module } from '@nestjs/common';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriasController } from '../../controllers/categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../../domains/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
