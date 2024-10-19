import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../domains/entities/categoria.entity'

export class CategoriaEntitySwagger extends Categoria {

    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

}