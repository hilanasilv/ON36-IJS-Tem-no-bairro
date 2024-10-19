import { ApiProperty } from '@nestjs/swagger';
import { Local } from '../domains/entities/local.entity'

export class BuscaEntitySwagger extends Local {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    endereco: string;

    @ApiProperty()
    horarioFuncionamento: string;

    @ApiProperty()
    usuarioNome: string;

    @ApiProperty()
    bairroNome: string;
}