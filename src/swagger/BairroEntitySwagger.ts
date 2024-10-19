import { ApiProperty } from '@nestjs/swagger';
import { Bairro } from '../domains/entities/bairro.entity'

export class BairroEntitySwagger extends Bairro {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;
}